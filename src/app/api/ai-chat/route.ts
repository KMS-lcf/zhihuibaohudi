import { NextRequest, NextResponse } from 'next/server';

// 石花洞风景名胜区系统提示
const SYSTEM_PROMPT = `你是石花洞风景名胜区智慧监管系统的AI助手。你的职责是为用户提供关于石花洞风景名胜区的信息和帮助。

关于石花洞风景名胜区：
- 位于北京市房山区，是国家重点风景名胜区
- 石花洞是中国四大名洞之一，以洞内钟乳石景观著称
- 景区内地质资源丰富，有独特的溶洞地貌
- 保护区内生物多样性丰富，有多种珍稀动植物

关于生物多样性：
- 保护区内有众多鸟类物种，包括多种保护鸟类
- 哺乳动物包括野猪、猕猴、豹猫等
- 红外相机监测显示野猪种群数量稳定增长
- 保护区内有多种珍稀植物和菌类

关于地质资源：
- 石花洞是典型的溶洞，形成于古生代
- 洞内有丰富的钟乳石、石笋、石柱等地质景观
- 具有重要的地质科研价值和旅游价值

请根据用户的问题，提供准确、专业、友好的回答。如果问题与石花洞风景名胜区无关，可以礼貌地引导用户回到相关话题。`;

// 动态导入 ZAI SDK 并处理错误
async function getZAI() {
  try {
    const ZAI = (await import('z-ai-web-dev-sdk')).default;
    return await ZAI.create();
  } catch (error) {
    console.error('Failed to initialize ZAI SDK:', error);
    return null;
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { message, model = 'glm-4-flash', history = [] } = body;

    if (!message || typeof message !== 'string') {
      return NextResponse.json(
        { success: false, error: '消息不能为空' },
        { status: 400 }
      );
    }

    const zai = await getZAI();

    // 如果 SDK 初始化失败，返回降级响应
    if (!zai) {
      return NextResponse.json({
        success: true,
        response: '抱歉，AI 助手服务暂时不可用，请稍后再试。如果您有关于石花洞风景名胜区的问题，可以查阅相关资料或联系工作人员。',
        model: 'fallback',
        isOffline: true,
      });
    }

    // 构建消息历史
    const messages = [
      {
        role: 'assistant' as const,
        content: SYSTEM_PROMPT,
      },
      ...history.map((h: { role: string; content: string }) => ({
        role: h.role as 'user' | 'assistant',
        content: h.content,
      })),
      {
        role: 'user' as const,
        content: message,
      },
    ];

    try {
      const completion = await zai.chat.completions.create({
        messages,
        thinking: { type: 'disabled' },
      });

      const response = completion.choices[0]?.message?.content;

      if (!response) {
        throw new Error('AI 未返回有效响应');
      }

      return NextResponse.json({
        success: true,
        response,
        model,
      });
    } catch (apiError) {
      console.error('AI API call failed:', apiError);
      // API 调用失败时返回降级响应
      return NextResponse.json({
        success: true,
        response: '抱歉，AI 助手服务暂时不可用，请稍后再试。',
        model: 'fallback',
        isOffline: true,
      });
    }
  } catch (error) {
    console.error('AI Chat API Error:', error);
    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : '服务器内部错误',
      },
      { status: 500 }
    );
  }
}
