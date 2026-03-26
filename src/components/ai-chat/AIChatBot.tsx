'use client';

import { useState, useRef, useEffect, useCallback } from 'react';
import { Bot, X, Send, Sparkles, ChevronDown, Loader2, GripVertical } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { cn } from '@/lib/utils';

interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}

interface AIChatBotProps {
  className?: string;
}

// 可用的模型列表
const AVAILABLE_MODELS = [
  { id: 'glm-4-flash', name: 'GLM-4-Flash', description: '快速响应' },
  { id: 'glm-4-plus', name: 'GLM-4-Plus', description: '均衡性能' },
  { id: 'glm-4-air', name: 'GLM-4-Air', description: '经济实惠' },
];

// 预设问题
const PRESET_QUESTIONS = [
  { id: '1', question: '介绍石花洞', icon: '🏔️' },
  { id: '2', question: '保护鸟类分布图', icon: '🐦' },
  { id: '3', question: '野猪数量变化情况', icon: '🐗' },
];

export function AIChatBot({ className }: AIChatBotProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [selectedModel, setSelectedModel] = useState(AVAILABLE_MODELS[0]);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  
  // 拖拽相关状态
  const [position, setPosition] = useState({ x: 24, y: 0 }); // 默认右侧中间偏下
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const [hasMoved, setHasMoved] = useState(false);
  const buttonRef = useRef<HTMLButtonElement>(null);

  // 初始化位置 - 右侧中间靠下
  useEffect(() => {
    const windowHeight = window.innerHeight;
    setPosition(prev => ({
      ...prev,
      y: windowHeight / 2 + 100 // 中间靠下100px
    }));
  }, []);

  // 滚动到底部
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // 打开对话框时聚焦输入框
  useEffect(() => {
    if (isOpen) {
      setTimeout(() => {
        inputRef.current?.focus();
      }, 100);
    }
  }, [isOpen]);

  // 拖拽开始
  const handleMouseDown = useCallback((e: React.MouseEvent) => {
    if (isOpen) return; // 对话框打开时不允许拖拽
    
    e.preventDefault();
    setIsDragging(true);
    setHasMoved(false);
    setDragStart({
      x: e.clientX - position.x,
      y: e.clientY - position.y,
    });
  }, [isOpen, position]);

  // 拖拽中
  useEffect(() => {
    if (!isDragging) return;

    const handleMouseMove = (e: MouseEvent) => {
      const newX = e.clientX - dragStart.x;
      const newY = e.clientY - dragStart.y;
      
      // 检测是否有实际移动
      if (Math.abs(newX - position.x) > 3 || Math.abs(newY - position.y) > 3) {
        setHasMoved(true);
      }
      
      // 限制在屏幕范围内
      const buttonSize = 44; // w-11 h-11 = 44px
      const padding = 8;
      const maxX = window.innerWidth - buttonSize - padding;
      const maxY = window.innerHeight - buttonSize - padding;
      
      setPosition({
        x: Math.max(padding, Math.min(maxX, newX)),
        y: Math.max(padding, Math.min(maxY, newY)),
      });
    };

    const handleMouseUp = () => {
      setIsDragging(false);
    };

    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isDragging, dragStart, position]);

  // 点击处理
  const handleClick = () => {
    if (!hasMoved && !isDragging) {
      setIsOpen(!isOpen);
    }
  };

  // 发送消息
  const sendMessage = async (content: string) => {
    if (!content.trim() || isLoading) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: content.trim(),
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputValue('');
    setIsLoading(true);

    try {
      const response = await fetch('/api/ai-chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          message: content.trim(),
          model: selectedModel.id,
          history: messages.map((m) => ({
            role: m.role,
            content: m.content,
          })),
        }),
      });

      const data = await response.json();

      if (data.success) {
        const assistantMessage: Message = {
          id: (Date.now() + 1).toString(),
          role: 'assistant',
          content: data.response,
          timestamp: new Date(),
        };
        setMessages((prev) => [...prev, assistantMessage]);
      } else {
        throw new Error(data.error || '请求失败');
      }
    } catch (error) {
      console.error('AI Chat Error:', error);
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: '抱歉，我遇到了一些问题，请稍后再试。',
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  // 点击预设问题
  const handlePresetQuestion = (question: string) => {
    sendMessage(question);
  };

  // 处理表单提交
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    sendMessage(inputValue);
  };

  // 清空对话
  const clearMessages = () => {
    setMessages([]);
  };

  return (
    <div className={cn('fixed z-50', className)}>
      {/* 悬浮按钮 - 尺寸减少1/5: w-14 h-14 -> w-11 h-11 */}
      <Button
        ref={buttonRef}
        onMouseDown={handleMouseDown}
        onClick={handleClick}
        className={cn(
          'fixed w-11 h-11 rounded-full shadow-lg transition-all duration-200',
          'bg-gradient-to-br from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700',
          'border-2 border-white/20',
          'cursor-grab active:cursor-grabbing',
          isOpen ? 'opacity-0 scale-75 pointer-events-none' : 'opacity-100 scale-100',
          isDragging && 'shadow-xl scale-110'
        )}
        style={{
          right: position.x,
          top: position.y,
        }}
      >
        <Bot className="w-5 h-5 text-white" />
      </Button>

      {/* 对话框 - 固定在右侧 */}
      <div
        className={cn(
          'fixed right-6 bg-white rounded-2xl shadow-2xl transition-all duration-300 overflow-hidden',
          'border border-gray-100 flex flex-col',
          isOpen
            ? 'opacity-100 scale-100 translate-x-0'
            : 'opacity-0 scale-95 translate-x-4 pointer-events-none'
        )}
        style={{
          bottom: 'calc(50vh - 280px)',
          width: '400px',
          height: '560px',
        }}
      >
        {/* 头部 */}
        <div className="bg-gradient-to-r from-emerald-500 to-teal-600 px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-full bg-white/20 flex items-center justify-center">
              <Sparkles className="w-5 h-5 text-white" />
            </div>
            <div>
              <h3 className="text-white font-semibold text-sm">AI 智能助手</h3>
              <p className="text-white/70 text-xs">石花洞风景名胜区</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            {/* 模型选择 */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  size="sm"
                  className="text-white/80 hover:text-white hover:bg-white/10 h-7 px-2 text-xs"
                >
                  {selectedModel.name}
                  <ChevronDown className="w-3 h-3 ml-1" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-40">
                {AVAILABLE_MODELS.map((model) => (
                  <DropdownMenuItem
                    key={model.id}
                    onClick={() => setSelectedModel(model)}
                    className={cn(
                      'flex flex-col items-start',
                      selectedModel.id === model.id && 'bg-emerald-50'
                    )}
                  >
                    <span className="font-medium">{model.name}</span>
                    <span className="text-xs text-muted-foreground">{model.description}</span>
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
            {/* 关闭按钮 */}
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsOpen(false)}
              className="text-white/80 hover:text-white hover:bg-white/10 h-8 w-8"
            >
              <X className="w-4 h-4" />
            </Button>
          </div>
        </div>

        {/* 预设问题 */}
        {messages.length === 0 && (
          <div className="px-4 py-3 border-b bg-gray-50/50">
            <p className="text-xs text-muted-foreground mb-2">快捷提问：</p>
            <div className="flex flex-wrap gap-2">
              {PRESET_QUESTIONS.map((item) => (
                <Button
                  key={item.id}
                  variant="outline"
                  size="sm"
                  onClick={() => handlePresetQuestion(item.question)}
                  className="h-7 px-3 text-xs bg-white hover:bg-emerald-50 hover:text-emerald-700 hover:border-emerald-200"
                  disabled={isLoading}
                >
                  <span className="mr-1">{item.icon}</span>
                  {item.question}
                </Button>
              ))}
            </div>
          </div>
        )}

        {/* 消息区域 */}
        <ScrollArea className="flex-1 p-4">
          {messages.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-center px-4">
              <div className="w-16 h-16 rounded-full bg-emerald-50 flex items-center justify-center mb-4">
                <Bot className="w-8 h-8 text-emerald-500" />
              </div>
              <h4 className="font-medium text-gray-900 mb-1">您好，我是 AI 助手</h4>
              <p className="text-sm text-muted-foreground">
                我可以为您介绍石花洞风景名胜区的相关信息，包括地质资源、生物多样性等内容。
              </p>
            </div>
          ) : (
            <div className="space-y-4">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={cn(
                    'flex gap-3',
                    message.role === 'user' ? 'justify-end' : 'justify-start'
                  )}
                >
                  {message.role === 'assistant' && (
                    <Avatar className="w-8 h-8 flex-shrink-0">
                      <AvatarFallback className="bg-emerald-100 text-emerald-600">
                        <Bot className="w-4 h-4" />
                      </AvatarFallback>
                    </Avatar>
                  )}
                  <div
                    className={cn(
                      'max-w-[80%] rounded-2xl px-4 py-2.5 text-sm',
                      message.role === 'user'
                        ? 'bg-emerald-500 text-white rounded-br-sm'
                        : 'bg-gray-100 text-gray-800 rounded-bl-sm'
                    )}
                  >
                    <p className="whitespace-pre-wrap leading-relaxed">{message.content}</p>
                  </div>
                  {message.role === 'user' && (
                    <Avatar className="w-8 h-8 flex-shrink-0">
                      <AvatarFallback className="bg-gray-200 text-gray-600">
                        您
                      </AvatarFallback>
                    </Avatar>
                  )}
                </div>
              ))}
              {isLoading && (
                <div className="flex gap-3">
                  <Avatar className="w-8 h-8 flex-shrink-0">
                    <AvatarFallback className="bg-emerald-100 text-emerald-600">
                      <Bot className="w-4 h-4" />
                    </AvatarFallback>
                  </Avatar>
                  <div className="bg-gray-100 rounded-2xl rounded-bl-sm px-4 py-3">
                    <Loader2 className="w-4 h-4 animate-spin text-emerald-500" />
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>
          )}
        </ScrollArea>

        {/* 输入区域 */}
        <div className="border-t p-3 bg-gray-50/50">
          <form onSubmit={handleSubmit} className="flex gap-2">
            <input
              ref={inputRef}
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              placeholder="请输入您的问题..."
              disabled={isLoading}
              className="flex-1 h-10 px-4 rounded-full border border-gray-200 bg-white text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-300 disabled:bg-gray-100"
            />
            <Button
              type="submit"
              size="icon"
              disabled={!inputValue.trim() || isLoading}
              className="w-10 h-10 rounded-full bg-emerald-500 hover:bg-emerald-600 disabled:bg-gray-200"
            >
              <Send className="w-4 h-4" />
            </Button>
          </form>
          {messages.length > 0 && (
            <Button
              variant="ghost"
              size="sm"
              onClick={clearMessages}
              className="w-full mt-2 h-7 text-xs text-muted-foreground hover:text-foreground"
            >
              清空对话
            </Button>
          )}
        </div>
      </div>

      {/* 遮罩层 - 仅在移动端点击遮罩关闭 */}
      {isOpen && (
        <div
          className="fixed inset-0 z-[-1] md:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}
    </div>
  );
}

export default AIChatBot;
