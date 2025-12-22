// AI 概念数据库
const conceptsDB = {
    // ========== 基础模型 ==========
    "gpt-4": {
        name: "GPT-4 / GPT-4o",
        english: "Generative Pre-trained Transformer 4",
        category: "大语言模型 · OpenAI",
        summary: "OpenAI 开发的最先进大语言模型，具备强大的文本理解、生成、推理能力。GPT-4o 是其多模态版本，支持文本、图像、音频的统一处理。",
        highlight: "目前最强大的商用LLM之一，是ChatGPT Plus的核心引擎",
        principle: "基于 <strong>Transformer</strong> 架构，通过海量文本数据预训练学习语言规律，再通过 <strong>RLHF</strong> 对齐人类偏好。采用自回归方式逐token生成文本。",
        features: [
            "支持128K超长上下文",
            "强大的逻辑推理和代码能力",
            "GPT-4o支持实时语音对话",
            "支持Function Calling工具调用",
            "多语言能力出色"
        ],
        useCases: ["智能对话助手", "代码生成与调试", "文档分析与总结", "创意写作", "数据分析"],
        tags: ["OpenAI", "闭源", "多模态", "RLHF", "商用"]
    },
    
    "claude": {
        name: "Claude 3.5",
        english: "Claude",
        category: "大语言模型 · Anthropic",
        summary: "Anthropic 公司开发的大语言模型，以安全性和有用性著称。Claude 3.5 Sonnet 在多项基准测试中表现优异，特别擅长长文档处理和代码任务。",
        highlight: "以 Constitutional AI 技术著称，在安全性和诚实性方面表现突出",
        principle: "采用 <strong>Constitutional AI</strong> 方法训练，让AI根据一套「宪法」原则自我改进，减少有害输出。结合RLHF和RLAIF技术。",
        features: [
            "200K超长上下文窗口",
            "出色的代码生成能力",
            "强调安全性和诚实性",
            "支持视觉理解(Claude 3)",
            "Artifacts功能可实时预览代码"
        ],
        useCases: ["长文档分析", "代码开发", "学术研究", "安全敏感场景", "企业应用"],
        tags: ["Anthropic", "Constitutional AI", "安全", "长上下文"]
    },
    
    "llama": {
        name: "LLaMA 3",
        english: "Large Language Model Meta AI",
        category: "大语言模型 · Meta",
        summary: "Meta（Facebook）开源的大语言模型系列，LLaMA 3是目前最强大的开源模型之一，提供8B、70B、405B等多种规模。",
        highlight: "最具影响力的开源LLM，推动了整个开源AI社区的发展",
        principle: "基于标准Transformer decoder架构，使用15T+ tokens训练。采用GQA(分组查询注意力)提升推理效率，支持8K上下文扩展到128K。",
        features: [
            "完全开源可商用",
            "多种模型规格可选",
            "活跃的社区生态",
            "支持微调和量化",
            "405B版本性能接近GPT-4"
        ],
        useCases: ["本地部署", "模型微调", "学术研究", "企业私有化部署", "边缘设备运行"],
        tags: ["Meta", "开源", "可商用", "社区生态"]
    },
    
    "mistral": {
        name: "Mistral / Mixtral",
        english: "Mistral AI Models",
        category: "大语言模型 · Mistral AI",
        summary: "法国AI公司Mistral AI开发的高效开源模型。Mixtral是其MoE(专家混合)版本，以较小的激活参数实现出色性能。",
        highlight: "Mixtral 8x7B 仅激活12B参数却达到70B级别性能",
        principle: "Mixtral采用 <strong>MoE架构</strong>，包含8个专家网络，每次推理只激活2个专家。结合滑动窗口注意力机制，高效处理长序列。",
        features: [
            "MoE架构高效推理",
            "Apache 2.0开源协议",
            "32K上下文窗口",
            "多语言支持出色",
            "推理速度快"
        ],
        useCases: ["资源受限场景", "实时应用", "多语言任务", "代码生成"],
        tags: ["MoE", "开源", "高效", "欧洲AI"]
    },
    
    "qwen": {
        name: "Qwen 通义千问",
        english: "Qwen (Tongyi Qianwen)",
        category: "大语言模型 · 阿里巴巴",
        summary: "阿里巴巴开发的大语言模型系列，中文能力出色，提供从0.5B到72B多种规格，支持文本、代码、数学、多模态等多种能力。",
        highlight: "中文能力最强的开源模型之一，生态完善",
        features: [
            "中文理解能力突出",
            "完整的模型矩阵",
            "支持长上下文(32K-128K)",
            "多模态版本Qwen-VL",
            "代码模型CodeQwen"
        ],
        useCases: ["中文场景应用", "企业智能客服", "代码辅助", "多模态理解"],
        tags: ["阿里巴巴", "中文优化", "开源", "国产"]
    },
    
    "deepseek": {
        name: "DeepSeek",
        english: "DeepSeek",
        category: "大语言模型 · 深度求索",
        summary: "深度求索公司开发的大语言模型，以高性价比著称。DeepSeek-V2采用MoE架构，API价格极具竞争力。",
        highlight: "API价格仅为GPT-4的1%，性价比极高",
        features: [
            "MoE架构高效推理",
            "API价格极低",
            "代码能力出色",
            "支持128K上下文",
            "开源可商用"
        ],
        tags: ["国产", "高性价比", "MoE", "开源"]
    },
    
    "stable-diffusion": {
        name: "Stable Diffusion",
        english: "Stable Diffusion",
        category: "图像生成 · Stability AI",
        summary: "最流行的开源图像生成模型，基于扩散模型(Diffusion Model)技术，可以根据文本描述生成高质量图像。",
        highlight: "开源图像生成的里程碑，催生了庞大的社区生态",
        principle: "基于 <strong>Latent Diffusion</strong> 技术，在压缩的潜空间中进行扩散过程。通过逐步去噪从随机噪声生成图像，使用CLIP进行文本-图像对齐。",
        features: [
            "完全开源可本地运行",
            "丰富的社区模型和LoRA",
            "支持ControlNet精确控制",
            "可进行图像编辑和修复",
            "SDXL版本质量大幅提升"
        ],
        useCases: ["AI艺术创作", "产品设计", "游戏美术", "广告素材", "图像编辑"],
        tags: ["开源", "Diffusion", "图像生成", "社区生态"]
    },
    
    "midjourney": {
        name: "Midjourney",
        english: "Midjourney",
        category: "图像生成 · Midjourney Inc",
        summary: "最受欢迎的AI图像生成服务，以出色的艺术风格和美学质量著称，通过Discord机器人使用。",
        highlight: "艺术风格最出色的AI图像生成工具，设计师首选",
        features: [
            "极高的美学质量",
            "独特的艺术风格",
            "简单的提示词即可出图",
            "支持图像混合和变体",
            "V6版本支持文字生成"
        ],
        useCases: ["艺术创作", "概念设计", "插画生成", "品牌视觉", "创意探索"],
        tags: ["闭源", "艺术风格", "Discord", "商用"]
    },
    
    "dall-e": {
        name: "DALL-E 3",
        english: "DALL-E",
        category: "图像生成 · OpenAI",
        summary: "OpenAI开发的文本到图像生成模型，集成在ChatGPT中，以准确理解复杂提示词和生成文字能力著称。",
        highlight: "提示词理解能力最强，能准确生成图中文字",
        features: [
            "精准理解复杂提示词",
            "可在图中生成文字",
            "与ChatGPT深度集成",
            "内置安全过滤",
            "支持图像编辑"
        ],
        tags: ["OpenAI", "ChatGPT集成", "文字生成"]
    },
    
    "sora": {
        name: "Sora",
        english: "Sora",
        category: "视频生成 · OpenAI",
        summary: "OpenAI开发的文本到视频生成模型，能生成长达60秒的高质量视频，被认为是AI视频生成的重大突破。",
        highlight: "首个能生成长时间、高质量、物理一致视频的AI模型",
        principle: "基于 <strong>Diffusion Transformer</strong> 架构，将视频视为时空patches序列处理。通过大规模视频数据训练，学习物理世界的运动规律。",
        features: [
            "生成最长60秒视频",
            "理解物理世界规律",
            "支持多种画面比例",
            "可从图像/视频扩展",
            "场景和角色一致性好"
        ],
        useCases: ["影视制作", "广告创意", "内容创作", "游戏过场动画"],
        tags: ["OpenAI", "视频生成", "Diffusion Transformer", "前沿"]
    },
    
    "whisper": {
        name: "Whisper",
        english: "Whisper",
        category: "语音识别 · OpenAI",
        summary: "OpenAI开源的自动语音识别(ASR)模型，支持多语言转录和翻译，在各种口音和背景噪音下表现稳健。",
        highlight: "最强大的开源语音识别模型，支持99种语言",
        features: [
            "支持99种语言识别",
            "可直接翻译成英文",
            "对噪音和口音鲁棒",
            "完全开源可本地运行",
            "多种模型规格可选"
        ],
        useCases: ["会议转录", "字幕生成", "语音助手", "播客转文字", "多语言翻译"],
        code: "import whisper\nmodel = whisper.load_model('base')\nresult = model.transcribe('audio.mp3')\nprint(result['text'])",
        tags: ["OpenAI", "开源", "语音识别", "多语言"]
    },
    
    // ========== 推理策略 ==========
    "cot": {
        name: "CoT 思维链",
        english: "Chain of Thought",
        category: "推理策略 · Prompting",
        summary: "一种提示工程技术，通过引导模型展示中间推理步骤来提升复杂问题的解决能力。让模型\"一步一步思考\"而不是直接给出答案。",
        highlight: "简单有效的推理增强技术，只需添加\"让我们一步步思考\"即可生效",
        principle: "人类解决复杂问题时会分解成多个步骤。CoT模拟这一过程，让模型在生成最终答案前先输出推理链条，每一步都基于前一步，减少跳跃性错误。",
        features: [
            "显著提升数学推理能力",
            "提高逻辑问题准确率",
            "使推理过程可解释",
            "零成本即可使用",
            "可与其他技术结合"
        ],
        useCases: ["数学问题求解", "逻辑推理", "多步骤任务", "复杂决策分析"],
        code: '# 普通提示\n"Q: 15+27=? A:"\n\n# CoT提示\n"Q: 15+27=?\nA: 让我们一步步计算：\n   15+27 = 15+20+7 = 35+7 = 42\n   答案是42"',
        tags: ["Prompting", "推理增强", "Google", "2022"]
    },
    
    "tot": {
        name: "ToT 思维树",
        english: "Tree of Thought",
        category: "推理策略 · Prompting",
        summary: "CoT的扩展，允许模型探索多条推理路径形成树状结构，通过搜索和回溯找到最优解。适合需要探索和规划的复杂问题。",
        highlight: "将推理过程从线性链条扩展为可回溯的树状探索",
        principle: "模型在每个决策点生成多个可能的思考方向，形成树状结构。通过BFS/DFS搜索策略探索，使用评估函数判断路径质量，支持回溯到更优路径。",
        features: [
            "支持多路径探索",
            "可以回溯错误决策",
            "适合规划类问题",
            "结合搜索算法",
            "提供多个候选答案"
        ],
        useCases: ["游戏策略", "创意写作", "数学证明", "代码生成", "复杂规划"],
        tags: ["推理增强", "搜索", "规划", "2023"]
    },
    
    "react": {
        name: "ReAct",
        english: "Reasoning and Acting",
        category: "Agent推理 · 推理策略",
        summary: "一种让LLM交替进行推理(Reasoning)和行动(Acting)的框架。模型先思考需要做什么，然后执行动作，观察结果，再继续思考。",
        highlight: "Agent的核心推理范式，实现\"边想边做\"的智能行为",
        principle: "循环执行三个步骤：<strong>Thought</strong>(思考当前情况) → <strong>Action</strong>(执行具体操作如调用工具) → <strong>Observation</strong>(获取结果反馈)。不断迭代直到任务完成。",
        features: [
            "推理与行动交替进行",
            "可调用外部工具",
            "推理过程透明可解释",
            "适应动态环境",
            "是Agent的基础架构"
        ],
        useCases: ["智能助手", "自动化任务", "信息检索", "问答系统", "代码执行"],
        code: 'Thought 1: 我需要查询北京天气\nAction 1: search("北京今天天气")\nObservation 1: 晴天，25°C\nThought 2: 已获得信息，可以回答\nAnswer: 北京今天晴天，气温25度',
        tags: ["Agent", "工具调用", "Google", "2022"]
    },
    
    "o1": {
        name: "o1 / o3 Reasoning",
        english: "OpenAI o1/o3",
        category: "深度推理 · OpenAI",
        summary: "OpenAI推出的专注于复杂推理的模型系列。通过在推理时进行更长时间的\"思考\"，在数学、编程、科学问题上大幅超越GPT-4。",
        highlight: "开创\"Test-Time Compute\"范式，推理时间越长效果越好",
        principle: "采用 <strong>Test-Time Compute</strong> 策略，模型在回答前进行长时间的内部推理（思维链），可能包含数千个推理token。通过强化学习训练模型学会更好的推理策略。",
        features: [
            "数学推理能力极强",
            "编程竞赛级别代码能力",
            "科学问题理解深入",
            "推理过程更长更深",
            "支持调整思考时间"
        ],
        useCases: ["数学证明", "算法竞赛", "科学研究", "复杂代码", "逻辑难题"],
        tags: ["OpenAI", "深度推理", "Test-Time Compute", "2024"]
    },
    
    "zero-shot": {
        name: "Zero-shot",
        english: "Zero-shot Prompting",
        category: "Prompting · 基础技术",
        summary: "不提供任何示例，直接让模型完成任务的提示方式。依赖模型预训练时学到的知识和能力。",
        highlight: "最简单的提示方式，直接描述任务让模型执行",
        features: [
            "无需准备示例",
            "使用简单直接",
            "适合简单任务",
            "依赖模型基础能力"
        ],
        code: '# Zero-shot示例\n"将下面的句子翻译成英文：今天天气很好"',
        tags: ["Prompting", "基础"]
    },
    
    "few-shot": {
        name: "Few-shot",
        english: "Few-shot Prompting",
        category: "Prompting · 基础技术",
        summary: "在提示中提供少量示例(通常1-5个)，帮助模型理解任务格式和期望输出。是提升模型表现的常用技术。",
        highlight: "通过示例教会模型任务格式，显著提升输出质量",
        features: [
            "通过示例引导输出格式",
            "提升任务理解准确性",
            "适合格式化输出任务",
            "示例质量影响效果"
        ],
        code: '# Few-shot示例\n"情感分析：\n文本：这个产品太棒了！ 情感：正面\n文本：质量很差，不推荐 情感：负面\n文本：还可以，一般般 情感："',
        tags: ["Prompting", "基础", "In-context Learning"]
    },
    
    "self-consistency": {
        name: "Self-Consistency",
        english: "Self-Consistency",
        category: "推理策略 · Prompting",
        summary: "让模型对同一问题生成多个推理路径，然后通过投票选出最一致的答案。通过多样性采样提高准确率。",
        highlight: "多次采样+投票，用一致性提升准确率",
        principle: "对同一问题进行多次采样(如5-10次)，每次可能产生不同的推理路径。统计所有路径得出的答案，选择出现次数最多的作为最终答案。",
        features: [
            "提高答案可靠性",
            "减少随机错误",
            "与CoT结合效果好",
            "需要多次推理成本较高"
        ],
        tags: ["推理增强", "采样", "投票"]
    },
    
    "mcts": {
        name: "MCTS",
        english: "Monte Carlo Tree Search",
        category: "搜索算法 · 深度推理",
        summary: "蒙特卡洛树搜索，一种结合随机模拟和树搜索的决策算法。在AI推理中用于探索最优推理路径。",
        highlight: "AlphaGo的核心算法，现被用于增强LLM推理",
        principle: "四个步骤循环：<strong>选择</strong>(从根节点选择最有价值的子节点) → <strong>扩展</strong>(添加新节点) → <strong>模拟</strong>(随机模拟到终局) → <strong>回溯</strong>(更新路径上节点的价值)。",
        features: [
            "平衡探索与利用",
            "不需要完整搜索空间",
            "可用于复杂决策",
            "与神经网络结合效果好"
        ],
        useCases: ["游戏AI", "复杂推理", "规划问题", "代码生成搜索"],
        tags: ["搜索算法", "AlphaGo", "决策"]
    },
    
    // ========== AI Agent ==========
    "agent": {
        name: "AI Agent",
        english: "AI Agent / Autonomous Agent",
        category: "智能体 · 核心概念",
        summary: "能够自主感知环境、做出决策、执行行动以达成目标的AI系统。相比普通LLM，Agent具有工具使用、记忆、规划等能力。",
        highlight: "从\"对话\"到\"做事\"，AI Agent是LLM应用的重要演进方向",
        principle: "Agent = LLM(大脑) + Memory(记忆) + Tools(工具) + Planning(规划)。LLM作为核心推理引擎，通过调用工具与环境交互，利用记忆保持上下文，通过规划分解复杂任务。",
        features: [
            "自主决策和执行",
            "可调用外部工具",
            "具有记忆能力",
            "能够规划和分解任务",
            "可与环境交互"
        ],
        useCases: ["自动化办公", "代码开发", "数据分析", "客服机器人", "个人助理"],
        tags: ["自主性", "工具调用", "规划", "核心概念"]
    },
    
    "multi-agent": {
        name: "Multi-Agent",
        english: "Multi-Agent System",
        category: "智能体 · 架构模式",
        summary: "多个AI Agent协作完成任务的系统架构。不同Agent可以扮演不同角色(如产品经理、工程师、测试员)，通过对话和协作解决复杂问题。",
        highlight: "模拟人类团队协作，多个专业Agent各司其职",
        features: [
            "角色分工明确",
            "Agent间可以对话协作",
            "适合复杂工作流",
            "可模拟组织结构",
            "支持并行执行"
        ],
        useCases: ["软件开发团队模拟", "研究协作", "复杂项目管理", "辩论和决策"],
        tags: ["协作", "角色扮演", "工作流"]
    },
    
    "function-calling": {
        name: "Function Calling",
        english: "Function Calling / Tool Use",
        category: "Agent能力 · 核心技术",
        summary: "让LLM能够调用预定义函数/API的能力。模型根据用户需求决定调用哪个函数、传入什么参数，实现与外部系统的交互。",
        highlight: "LLM从\"只会说\"到\"能做事\"的关键能力",
        principle: "向模型提供可用函数的描述(名称、参数、用途)。模型分析用户请求，决定是否需要调用函数，生成结构化的函数调用请求。系统执行函数后将结果返回给模型继续处理。",
        features: [
            "结构化输出函数调用",
            "支持多函数选择",
            "参数自动提取",
            "可链式调用多个函数",
            "主流LLM都已支持"
        ],
        useCases: ["API集成", "数据库查询", "外部服务调用", "自动化工作流"],
        code: '// 函数定义\n{\n  "name": "get_weather",\n  "parameters": {\n    "location": "string",\n    "unit": "celsius|fahrenheit"\n  }\n}\n\n// 模型输出\n{"name": "get_weather", "arguments": {"location": "北京"}}',
        tags: ["OpenAI", "工具调用", "API", "核心能力"]
    },
    
    "tool-use": {
        name: "Tool Use",
        english: "Tool Use",
        category: "Agent能力 · 核心技术",
        summary: "AI Agent使用外部工具(搜索引擎、计算器、代码执行器、API等)来扩展自身能力的技术。是Agent区别于普通LLM的关键特征。",
        highlight: "工具让AI从\"知识库\"变成\"能做事的助手\"",
        features: [
            "突破LLM知识时效性限制",
            "执行精确计算",
            "访问实时信息",
            "操作外部系统",
            "执行代码验证结果"
        ],
        useCases: ["实时搜索", "数学计算", "代码执行", "文件操作", "数据库查询"],
        tags: ["Agent", "能力扩展", "外部交互"]
    },
    
    "memory": {
        name: "Memory",
        english: "Agent Memory",
        category: "Agent能力 · 核心组件",
        summary: "Agent的记忆系统，用于存储和检索历史信息。包括短期记忆(当前对话上下文)和长期记忆(持久化存储的知识和经验)。",
        highlight: "让AI\"记住\"用户和历史，实现个性化和持续学习",
        principle: "短期记忆通常是对话历史，受上下文窗口限制。长期记忆使用向量数据库存储，通过语义检索召回相关信息注入上下文。",
        features: [
            "保持对话连贯性",
            "记住用户偏好",
            "存储重要信息",
            "支持经验积累",
            "可实现个性化"
        ],
        useCases: ["个性化助手", "知识管理", "持续对话", "学习系统"],
        tags: ["Agent", "向量数据库", "个性化"]
    },
    
    "autogpt": {
        name: "AutoGPT",
        english: "AutoGPT",
        category: "Agent项目 · 开源",
        summary: "最早引发Agent热潮的开源项目，尝试让GPT-4完全自主地完成复杂任务。用户只需设定目标，Agent自动规划和执行。",
        highlight: "Agent概念的布道者，虽不完美但开启了自主AI时代",
        features: [
            "完全自主执行任务",
            "自动分解目标",
            "可访问互联网",
            "支持文件读写",
            "长期记忆存储"
        ],
        tags: ["开源", "自主Agent", "GPT-4", "2023"]
    },
    
    "crewai": {
        name: "CrewAI",
        english: "CrewAI",
        category: "Agent框架 · 多Agent",
        summary: "专注于多Agent协作的框架，让多个AI Agent像团队一样协作。每个Agent有特定角色、目标和工具，通过定义好的流程协同工作。",
        highlight: "像组建团队一样组建AI Agent，角色分工协作",
        features: [
            "角色定义清晰",
            "支持顺序/并行任务",
            "Agent间可委托任务",
            "内置多种工具",
            "易于上手"
        ],
        code: 'from crewai import Agent, Task, Crew\n\nresearcher = Agent(role="研究员", goal="收集信息")\nwriter = Agent(role="作家", goal="撰写内容")\n\ncrew = Crew(agents=[researcher, writer], tasks=[...])\nresult = crew.kickoff()',
        tags: ["多Agent", "协作", "Python", "开源"]
    },
    
    "autogen": {
        name: "AutoGen",
        english: "AutoGen",
        category: "Agent框架 · Microsoft",
        summary: "微软开源的多Agent对话框架，支持多个Agent通过对话协作完成任务。特别适合需要人机协作和多轮讨论的场景。",
        highlight: "微软出品，强调Agent对话和人机协作",
        features: [
            "灵活的对话模式",
            "支持人类参与",
            "代码执行能力强",
            "可自定义Agent行为",
            "企业级支持"
        ],
        tags: ["Microsoft", "多Agent", "对话", "开源"]
    },
    
    // ========== 开发框架 ==========
    "langchain": {
        name: "LangChain",
        english: "LangChain",
        category: "开发框架 · 综合",
        summary: "最流行的LLM应用开发框架，提供了构建LLM应用所需的各种组件：模型接口、提示模板、链、Agent、记忆、检索等。",
        highlight: "LLM应用开发的\"瑞士军刀\"，生态最完善",
        principle: "核心抽象包括：<strong>Model</strong>(统一的LLM接口)、<strong>Prompt</strong>(提示模板)、<strong>Chain</strong>(组件串联)、<strong>Agent</strong>(自主决策)、<strong>Memory</strong>(状态管理)、<strong>Retriever</strong>(知识检索)。",
        features: [
            "统一的LLM接口",
            "丰富的组件库",
            "灵活的链式调用",
            "内置Agent支持",
            "活跃的社区生态"
        ],
        useCases: ["RAG应用", "对话机器人", "Agent开发", "文档问答", "自动化工作流"],
        code: 'from langchain_openai import ChatOpenAI\nfrom langchain.prompts import ChatPromptTemplate\n\nllm = ChatOpenAI(model="gpt-4")\nprompt = ChatPromptTemplate.from_template("翻译成英文: {text}")\nchain = prompt | llm\nresult = chain.invoke({"text": "你好世界"})',
        tags: ["Python", "JS", "生态完善", "最流行"]
    },
    
    "llamaindex": {
        name: "LlamaIndex",
        english: "LlamaIndex",
        category: "开发框架 · 数据检索",
        summary: "专注于数据连接和检索的LLM框架，特别擅长构建RAG应用。提供了丰富的数据加载器、索引类型和检索策略。",
        highlight: "RAG应用的首选框架，数据处理能力强大",
        features: [
            "丰富的数据加载器",
            "多种索引类型",
            "高级检索策略",
            "查询引擎抽象",
            "与LangChain互补"
        ],
        useCases: ["知识库问答", "文档分析", "企业搜索", "结构化数据查询"],
        code: 'from llama_index.core import VectorStoreIndex, SimpleDirectoryReader\n\ndocuments = SimpleDirectoryReader("data").load_data()\nindex = VectorStoreIndex.from_documents(documents)\nquery_engine = index.as_query_engine()\nresponse = query_engine.query("问题")',
        tags: ["RAG", "数据连接", "检索", "Python"]
    },
    
    "langgraph": {
        name: "LangGraph",
        english: "LangGraph",
        category: "Agent框架 · LangChain",
        summary: "LangChain团队开发的Agent编排框架，使用图结构定义Agent工作流。支持循环、条件分支、状态管理等复杂流程。",
        highlight: "用图的方式构建Agent，支持复杂的状态机逻辑",
        features: [
            "图结构定义工作流",
            "支持循环和分支",
            "内置状态管理",
            "支持人机交互节点",
            "可视化调试"
        ],
        useCases: ["复杂Agent流程", "多步骤工作流", "状态机应用", "人机协作系统"],
        tags: ["LangChain", "图结构", "状态机", "Agent"]
    },
    
    "dify": {
        name: "Dify",
        english: "Dify",
        category: "开发平台 · 低代码",
        summary: "开源的LLM应用开发平台，提供可视化的工作流编排、RAG管道、Agent构建等功能，让非技术人员也能构建AI应用。",
        highlight: "可视化拖拽构建AI应用，大幅降低开发门槛",
        features: [
            "可视化工作流编排",
            "内置RAG能力",
            "支持多种LLM",
            "应用一键部署",
            "团队协作功能"
        ],
        useCases: ["快速原型", "企业AI应用", "知识库问答", "工作流自动化"],
        tags: ["低代码", "可视化", "开源", "国产"]
    },
    
    "semantic-kernel": {
        name: "Semantic Kernel",
        english: "Semantic Kernel",
        category: "开发框架 · Microsoft",
        summary: "微软开源的LLM应用开发SDK，深度集成Azure服务，提供插件系统、规划器、记忆等企业级功能。",
        highlight: "微软官方SDK，Azure生态首选",
        features: [
            "插件化架构",
            "多语言支持(C#/Python/Java)",
            "Azure深度集成",
            "企业级安全",
            "规划器支持"
        ],
        tags: ["Microsoft", "Azure", "企业级", "多语言"]
    },
    
    // ========== RAG ==========
    "rag": {
        name: "RAG",
        english: "Retrieval Augmented Generation",
        category: "知识增强 · 核心技术",
        summary: "检索增强生成，通过从外部知识库检索相关信息，注入到LLM的上下文中，让模型基于检索到的知识生成回答。解决LLM知识过时和幻觉问题。",
        highlight: "让LLM\"开卷考试\"，基于真实知识回答问题",
        principle: "三个步骤：<strong>索引</strong>(文档分块→向量化→存入向量库) → <strong>检索</strong>(问题向量化→相似度搜索→获取相关文档) → <strong>生成</strong>(检索结果+问题→LLM生成答案)。",
        features: [
            "解决知识时效性问题",
            "减少幻觉",
            "可追溯信息来源",
            "支持私有知识库",
            "成本低于微调"
        ],
        useCases: ["企业知识库问答", "文档助手", "客服机器人", "法律/医疗咨询"],
        code: '# RAG基本流程\n1. 文档 → 分块 → Embedding → 向量数据库\n2. 问题 → Embedding → 相似度搜索 → Top-K文档\n3. Prompt = 问题 + 检索到的文档 → LLM → 答案',
        tags: ["知识增强", "向量检索", "核心技术", "必学"]
    },
    
    "embedding": {
        name: "Embedding",
        english: "Embedding / Vector Embedding",
        category: "RAG · 基础概念",
        summary: "将文本(或其他数据)转换为高维向量的技术。语义相近的内容在向量空间中距离更近，是RAG和语义搜索的基础。",
        highlight: "将语义转化为数学向量，让计算机\"理解\"含义",
        principle: "使用预训练的Embedding模型将文本映射到高维向量空间(如1536维)。通过余弦相似度或欧氏距离计算向量间的相似性，实现语义匹配。",
        features: [
            "捕捉语义信息",
            "支持相似度计算",
            "维度通常768-3072",
            "是向量搜索的基础"
        ],
        useCases: ["语义搜索", "文档相似度", "推荐系统", "聚类分析"],
        code: 'from openai import OpenAI\nclient = OpenAI()\n\nresponse = client.embeddings.create(\n    model="text-embedding-3-small",\n    input="你好世界"\n)\nvector = response.data[0].embedding  # 1536维向量',
        tags: ["向量化", "语义", "基础概念"]
    },
    
    "chunking": {
        name: "Chunking",
        english: "Document Chunking",
        category: "RAG · 数据处理",
        summary: "将长文档切分成小块的技术，是RAG流程的关键步骤。好的分块策略能显著影响检索质量。",
        highlight: "分块质量直接影响RAG效果，是容易被忽视的关键环节",
        features: [
            "固定大小分块(简单)",
            "语义分块(按段落/章节)",
            "递归分块(逐级细分)",
            "需要考虑重叠(overlap)",
            "块大小影响检索精度"
        ],
        useCases: ["文档预处理", "知识库构建"],
        tags: ["数据处理", "RAG", "预处理"]
    },
    
    "chroma": {
        name: "Chroma",
        english: "Chroma",
        category: "向量数据库 · 轻量级",
        summary: "轻量级开源向量数据库，专为AI应用设计。易于使用，可嵌入Python应用，适合快速原型和中小规模应用。",
        highlight: "最易上手的向量数据库，适合RAG入门",
        features: [
            "嵌入式使用简单",
            "支持持久化存储",
            "自动调用Embedding",
            "支持元数据过滤",
            "Python原生支持"
        ],
        code: 'import chromadb\n\nclient = chromadb.Client()\ncollection = client.create_collection("docs")\n\ncollection.add(\n    documents=["文档1", "文档2"],\n    ids=["id1", "id2"]\n)\n\nresults = collection.query(query_texts=["查询"], n_results=2)',
        tags: ["开源", "轻量", "嵌入式", "入门友好"]
    },
    
    "pinecone": {
        name: "Pinecone",
        english: "Pinecone",
        category: "向量数据库 · 托管服务",
        summary: "最流行的托管向量数据库服务，提供高性能、可扩展的向量搜索能力，无需管理基础设施。",
        highlight: "生产级向量数据库首选，免运维高可用",
        features: [
            "全托管服务",
            "高性能低延迟",
            "自动扩展",
            "多种索引类型",
            "丰富的SDK"
        ],
        tags: ["托管", "生产级", "高性能", "商用"]
    },
    
    "faiss": {
        name: "FAISS",
        english: "Facebook AI Similarity Search",
        category: "向量数据库 · Meta",
        summary: "Meta开源的高效向量相似度搜索库，支持十亿级向量的快速检索，是很多向量数据库的底层引擎。",
        highlight: "工业级向量检索库，性能标杆",
        features: [
            "支持GPU加速",
            "多种索引算法",
            "十亿级向量支持",
            "内存和磁盘索引",
            "C++/Python接口"
        ],
        tags: ["Meta", "高性能", "开源", "底层库"]
    },
    
    "graphrag": {
        name: "GraphRAG",
        english: "Graph RAG",
        category: "RAG · 高级技术",
        summary: "微软提出的基于知识图谱的RAG方法，将文档构建成图结构，通过图遍历和社区检测增强检索效果，特别适合需要全局理解的问题。",
        highlight: "用知识图谱增强RAG，更好地回答全局性问题",
        principle: "将文档中的实体和关系抽取构建成知识图谱，使用社区检测算法识别主题簇，生成多层次摘要。查询时结合图遍历和向量检索。",
        features: [
            "构建知识图谱",
            "支持全局问题",
            "多层次摘要",
            "实体关系推理",
            "比传统RAG效果好"
        ],
        tags: ["Microsoft", "知识图谱", "高级RAG", "2024"]
    },
    
    "bge": {
        name: "BGE",
        english: "BAAI General Embedding",
        category: "Embedding模型 · BAAI",
        summary: "北京智源研究院开源的通用Embedding模型，在中英文场景下表现出色，是目前最好的开源Embedding模型之一。",
        highlight: "中文Embedding最佳选择，开源免费",
        features: [
            "中英文双语支持",
            "多种规格可选",
            "MTEB榜单领先",
            "完全开源",
            "支持指令微调"
        ],
        tags: ["BAAI", "中文", "开源", "高质量"]
    },
    
    // ========== 模型优化 ==========
    "lora": {
        name: "LoRA",
        english: "Low-Rank Adaptation",
        category: "微调方法 · 参数高效",
        summary: "低秩适配，一种参数高效的微调方法。通过在原模型旁边添加小型可训练矩阵，只训练这些新参数，大幅减少显存和计算需求。",
        highlight: "用0.1%的参数实现接近全量微调的效果",
        principle: "对于原始权重矩阵W，添加低秩分解 ΔW = BA，其中B和A是小矩阵(秩r通常8-64)。训练时冻结W只训练B和A，推理时可合并回原模型。",
        features: [
            "显存需求大幅降低",
            "训练速度快",
            "可与原模型合并",
            "支持多个LoRA切换",
            "效果接近全量微调"
        ],
        useCases: ["领域适配", "风格微调", "指令微调", "个性化定制"],
        code: '# 使用PEFT库\nfrom peft import LoraConfig, get_peft_model\n\nconfig = LoraConfig(\n    r=8,  # 秩\n    lora_alpha=32,\n    target_modules=["q_proj", "v_proj"],\n    lora_dropout=0.1\n)\nmodel = get_peft_model(base_model, config)',
        tags: ["参数高效", "显存友好", "最流行", "必学"]
    },
    
    "qlora": {
        name: "QLoRA",
        english: "Quantized LoRA",
        category: "微调方法 · 参数高效",
        summary: "在LoRA基础上结合4-bit量化，进一步降低显存需求。可以在单张消费级GPU上微调65B参数模型。",
        highlight: "单张24G显卡微调70B模型成为可能",
        features: [
            "4-bit量化基座模型",
            "显存需求极低",
            "效果损失很小",
            "支持NF4量化",
            "双量化技术"
        ],
        tags: ["量化", "LoRA", "低资源", "消费级GPU"]
    },
    
    "rlhf": {
        name: "RLHF",
        english: "Reinforcement Learning from Human Feedback",
        category: "训练技术 · 对齐",
        summary: "基于人类反馈的强化学习，用于让模型输出符合人类偏好。是ChatGPT等对话模型\"对齐\"的核心技术。",
        highlight: "让AI学会\"什么是好回答\"的关键技术",
        principle: "三阶段：<strong>SFT</strong>(监督微调基础对话能力) → <strong>奖励模型</strong>(学习人类偏好排序) → <strong>PPO</strong>(用奖励模型指导强化学习优化策略)。",
        features: [
            "对齐人类偏好",
            "提升回答质量",
            "增强安全性",
            "减少有害输出",
            "是ChatGPT的核心"
        ],
        useCases: ["对话模型训练", "安全对齐", "质量提升"],
        tags: ["对齐", "强化学习", "OpenAI", "核心技术"]
    },
    
    "dpo": {
        name: "DPO",
        english: "Direct Preference Optimization",
        category: "训练技术 · 对齐",
        summary: "直接偏好优化，RLHF的简化替代方案。不需要训练奖励模型和PPO，直接从偏好数据优化模型，更简单稳定。",
        highlight: "RLHF的简化版，效果相近但更易训练",
        principle: "将RLHF的奖励模型和PPO合并为一个优化目标，直接最大化偏好数据中好回答相对于差回答的概率。数学上等价于隐式的奖励模型。",
        features: [
            "无需奖励模型",
            "无需PPO训练",
            "训练更稳定",
            "实现更简单",
            "效果接近RLHF"
        ],
        code: '# DPO损失函数核心思想\n# 最大化: log(π(y_win|x)) - log(π(y_lose|x))\n# 让模型更倾向于生成人类偏好的回答',
        tags: ["对齐", "简化RLHF", "2023", "趋势"]
    },
    
    "sft": {
        name: "SFT",
        english: "Supervised Fine-tuning",
        category: "训练技术 · 基础",
        summary: "监督微调，使用标注好的问答对数据对预训练模型进行微调，让模型学会按指令格式回答问题。是RLHF的第一步。",
        highlight: "让预训练模型学会\"对话\"的基础步骤",
        features: [
            "使用问答对数据",
            "学习对话格式",
            "是RLHF的基础",
            "相对简单直接"
        ],
        tags: ["微调", "基础", "指令学习"]
    },
    
    "gguf": {
        name: "GGUF / GGML",
        english: "GPT-Generated Unified Format",
        category: "量化格式 · llama.cpp",
        summary: "llama.cpp使用的模型格式，支持多种量化精度(Q4/Q5/Q8等)。是本地运行大模型的标准格式。",
        highlight: "本地跑大模型的标准格式，CPU也能运行",
        features: [
            "多种量化级别",
            "CPU推理优化",
            "单文件格式",
            "跨平台支持",
            "社区广泛使用"
        ],
        tags: ["量化", "本地部署", "llama.cpp"]
    },
    
    "peft": {
        name: "HuggingFace PEFT",
        english: "Parameter-Efficient Fine-Tuning",
        category: "微调工具 · HuggingFace",
        summary: "HuggingFace的参数高效微调库，支持LoRA、Prefix Tuning、P-Tuning等多种方法，与Transformers无缝集成。",
        highlight: "参数高效微调的标准工具库",
        features: [
            "支持多种PEFT方法",
            "与Transformers集成",
            "易于使用",
            "活跃维护"
        ],
        tags: ["HuggingFace", "微调", "工具库"]
    },
    
    "llama-factory": {
        name: "LLaMA-Factory",
        english: "LLaMA-Factory",
        category: "微调工具 · 一站式",
        summary: "一站式大模型微调框架，支持100+模型、多种微调方法、WebUI界面，大幅简化微调流程。",
        highlight: "最易用的微调工具，WebUI一键微调",
        features: [
            "支持100+模型",
            "WebUI可视化界面",
            "支持LoRA/QLoRA/全量",
            "内置数据集模板",
            "一键导出部署"
        ],
        tags: ["一站式", "WebUI", "国产", "易用"]
    },
    
    // ========== 推理部署 ==========
    "vllm": {
        name: "vLLM",
        english: "vLLM",
        category: "推理引擎 · 高性能",
        summary: "高吞吐量LLM推理引擎，通过PagedAttention技术优化显存管理，支持连续批处理，是生产环境部署的首选。",
        highlight: "生产级LLM推理首选，吞吐量提升数倍",
        principle: "核心创新是 <strong>PagedAttention</strong>，将KV Cache分页管理，避免显存碎片。支持连续批处理(Continuous Batching)，动态调度请求最大化GPU利用率。",
        features: [
            "PagedAttention技术",
            "连续批处理",
            "高吞吐低延迟",
            "OpenAI兼容API",
            "支持多GPU"
        ],
        useCases: ["生产环境部署", "高并发服务", "API服务"],
        tags: ["高性能", "生产级", "PagedAttention"]
    },
    
    "ollama": {
        name: "Ollama",
        english: "Ollama",
        category: "推理工具 · 本地部署",
        summary: "最简单的本地大模型运行工具，一条命令即可下载运行各种开源模型。类似Docker的使用体验。",
        highlight: "本地跑大模型最简单的方式，一行命令搞定",
        features: [
            "一键安装运行",
            "自动下载模型",
            "支持众多模型",
            "提供API接口",
            "跨平台支持"
        ],
        code: '# 安装后一行命令运行\nollama run llama3\n\n# 或运行其他模型\nollama run mistral\nollama run codellama',
        tags: ["本地部署", "易用", "跨平台", "必装"]
    },
    
    "llama-cpp": {
        name: "llama.cpp",
        english: "llama.cpp",
        category: "推理引擎 · CPU优化",
        summary: "纯C/C++实现的LLM推理库，支持CPU推理和多种量化格式，可在没有GPU的设备上运行大模型。",
        highlight: "CPU也能跑大模型的神器",
        features: [
            "纯CPU推理",
            "多种量化支持",
            "内存占用低",
            "跨平台编译",
            "支持Apple Silicon"
        ],
        tags: ["CPU", "C++", "量化", "跨平台"]
    },
    
    // ========== AI编程助手 ==========
    "copilot": {
        name: "GitHub Copilot",
        english: "GitHub Copilot",
        category: "AI编程 · IDE插件",
        summary: "GitHub和OpenAI合作开发的AI编程助手，集成在IDE中提供代码补全、生成、解释等功能。是最广泛使用的AI编程工具。",
        highlight: "最流行的AI编程助手，改变了编程方式",
        features: [
            "智能代码补全",
            "根据注释生成代码",
            "多语言支持",
            "Chat功能对话编程",
            "支持主流IDE"
        ],
        useCases: ["日常编码", "学习新语言", "快速原型", "代码解释"],
        tags: ["GitHub", "OpenAI", "IDE插件", "商用"]
    },
    
    "cursor": {
        name: "Cursor",
        english: "Cursor",
        category: "AI编程 · AI-first IDE",
        summary: "专为AI编程设计的IDE，基于VS Code，深度集成AI能力。支持代码生成、编辑、对话、多文件修改等，是目前最强大的AI编程环境。",
        highlight: "AI-first的IDE，比Copilot更强大的编程体验",
        features: [
            "Composer多文件编辑",
            "代码库理解能力",
            "内联编辑(Cmd+K)",
            "支持多种模型",
            "Agent模式自主编程"
        ],
        useCases: ["复杂项目开发", "代码重构", "快速原型", "学习编程"],
        tags: ["IDE", "AI-first", "VS Code", "强大"]
    },
    
    "devin": {
        name: "Devin",
        english: "Devin",
        category: "代码Agent · AI工程师",
        summary: "Cognition公司开发的\"AI软件工程师\"，能够自主完成复杂的软件开发任务，包括理解需求、编写代码、调试、部署等。",
        highlight: "首个\"AI软件工程师\"，能自主完成开发任务",
        features: [
            "自主理解需求",
            "独立编写代码",
            "自动调试修复",
            "使用开发工具",
            "长期任务执行"
        ],
        tags: ["Agent", "自主编程", "2024", "前沿"]
    },
    
    "aider": {
        name: "Aider",
        english: "Aider",
        category: "代码Agent · 终端工具",
        summary: "终端中的AI编程助手，通过对话方式修改代码，自动进行git提交。适合喜欢命令行的开发者。",
        highlight: "终端党的AI编程神器，对话式修改代码",
        features: [
            "终端内对话编程",
            "自动git提交",
            "支持多文件编辑",
            "多种模型支持",
            "开源免费"
        ],
        tags: ["终端", "开源", "Git集成"]
    },
    
    "sdd": {
        name: "SDD",
        english: "Spec-Driven Development",
        category: "开发方法论 · AI时代",
        summary: "规格驱动开发，一种AI时代的开发方法论。先编写详细的规格说明文档，再让AI根据规格生成代码，提高AI生成代码的质量和一致性。",
        highlight: "AI时代的新开发范式：先写规格，再让AI实现",
        features: [
            "规格文档先行",
            "AI更好理解需求",
            "代码质量更高",
            "便于迭代和维护",
            "减少来回修改"
        ],
        useCases: ["AI辅助开发", "复杂项目", "团队协作"],
        tags: ["方法论", "AI开发", "规格"]
    },
    
    "prompt-engineering": {
        name: "Prompt Engineering",
        english: "Prompt Engineering",
        category: "开发方法论 · 基础技能",
        summary: "提示工程，设计和优化输入给LLM的提示词，以获得更好输出的技术和方法。是使用LLM的核心技能。",
        highlight: "与AI对话的艺术，决定AI输出质量的关键",
        features: [
            "明确任务描述",
            "提供足够上下文",
            "使用示例引导",
            "指定输出格式",
            "迭代优化提示"
        ],
        tags: ["基础技能", "必学", "LLM使用"]
    },
    
    // ========== 评估与安全 ==========
    "alignment": {
        name: "Alignment",
        english: "AI Alignment",
        category: "AI安全 · 核心概念",
        summary: "AI对齐，确保AI系统的行为符合人类意图和价值观的研究领域。目标是让AI做人类想要它做的事，而不是字面理解的事。",
        highlight: "确保AI\"听话\"且\"有益\"的核心挑战",
        features: [
            "价值观对齐",
            "意图理解",
            "安全行为",
            "可控性",
            "是AI安全的核心"
        ],
        tags: ["AI安全", "核心概念", "研究热点"]
    },
    
    "guardrails": {
        name: "Guardrails",
        english: "AI Guardrails",
        category: "AI安全 · 防护技术",
        summary: "AI护栏，对LLM的输入和输出进行过滤和验证的机制，防止有害内容生成、确保输出格式正确、验证事实准确性等。",
        highlight: "给AI加上\"安全带\"，防止出错和有害输出",
        features: [
            "输入过滤",
            "输出验证",
            "格式检查",
            "内容安全",
            "事实核查"
        ],
        useCases: ["生产环境部署", "企业应用", "敏感场景"],
        tags: ["安全", "防护", "生产必备"]
    },
    
    "hallucination": {
        name: "Hallucination",
        english: "Hallucination",
        category: "AI安全 · 问题",
        summary: "幻觉，LLM生成看似合理但实际错误或虚构信息的现象。是当前LLM的主要问题之一，RAG是主要缓解方法。",
        highlight: "LLM最大的问题：一本正经地胡说八道",
        features: [
            "生成虚假信息",
            "编造不存在的事实",
            "看起来很自信",
            "难以完全消除"
        ],
        tags: ["问题", "LLM局限", "需要RAG"]
    },
    
    "prompt-injection": {
        name: "Prompt Injection",
        english: "Prompt Injection",
        category: "AI安全 · 攻击",
        summary: "提示注入攻击，通过在输入中嵌入恶意指令，试图覆盖或绕过系统提示，让LLM执行非预期行为。",
        highlight: "LLM应用的主要安全威胁",
        features: [
            "覆盖系统提示",
            "绕过安全限制",
            "泄露敏感信息",
            "执行恶意指令"
        ],
        tags: ["安全威胁", "攻击", "需要防护"]
    },
    
    "langsmith": {
        name: "LangSmith",
        english: "LangSmith",
        category: "可观测性 · LangChain",
        summary: "LangChain官方的LLM应用可观测性平台，提供追踪、调试、评估、监控等功能，是开发和运维LLM应用的重要工具。",
        highlight: "LLM应用的\"调试器\"，看清每一步执行",
        features: [
            "调用链追踪",
            "性能监控",
            "自动评估",
            "数据集管理",
            "与LangChain集成"
        ],
        tags: ["LangChain", "可观测性", "调试"]
    },
    
    // ========== 前沿研究 ==========
    "moe": {
        name: "MoE",
        english: "Mixture of Experts",
        category: "模型架构 · 前沿",
        summary: "专家混合架构，模型包含多个\"专家\"子网络，每次推理只激活部分专家。可以用较少的计算获得大模型的能力。",
        highlight: "用小成本获得大模型能力的架构创新",
        principle: "模型包含多个专家网络和一个路由器。路由器根据输入决定激活哪些专家(通常2个)。虽然总参数量大，但每次只用部分参数，推理高效。",
        features: [
            "稀疏激活",
            "参数量大但推理快",
            "专家分工处理",
            "GPT-4/Mixtral都使用",
            "训练难度较高"
        ],
        tags: ["架构", "稀疏", "高效", "前沿"]
    },
    
    "mamba": {
        name: "Mamba / SSM",
        english: "Mamba / State Space Model",
        category: "模型架构 · 前沿",
        summary: "基于状态空间模型的序列建模架构，是Transformer的潜在替代者。线性复杂度处理长序列，推理效率高。",
        highlight: "挑战Transformer统治地位的新架构",
        features: [
            "线性复杂度",
            "长序列处理高效",
            "推理速度快",
            "无需注意力机制",
            "选择性状态空间"
        ],
        tags: ["架构创新", "非Transformer", "2024"]
    },
    
    "long-context": {
        name: "Long Context",
        english: "Long Context Window",
        category: "能力扩展 · 前沿",
        summary: "长上下文能力，指模型能处理的最大token数量。从最初的2K扩展到现在的100K+，使模型能处理整本书或大型代码库。",
        highlight: "从2K到200K，上下文长度的飞跃",
        features: [
            "处理长文档",
            "整本书分析",
            "大型代码库理解",
            "减少分块需求",
            "更连贯的对话"
        ],
        tags: ["能力扩展", "100K+", "趋势"]
    },
    
    "test-time-compute": {
        name: "Test-Time Compute",
        english: "Test-Time Compute",
        category: "新范式 · 前沿",
        summary: "推理时计算，让模型在回答问题时花更多时间\"思考\"，而不是立即给出答案。o1/o3模型的核心思想。",
        highlight: "思考越久答案越好的新范式",
        features: [
            "推理时间可调",
            "深度思考能力",
            "复杂问题效果好",
            "计算换质量"
        ],
        tags: ["新范式", "o1", "2024"]
    },
    
    "compound-ai": {
        name: "Compound AI Systems",
        english: "Compound AI Systems",
        category: "新范式 · 前沿",
        summary: "复合AI系统，将多个AI组件(LLM、检索器、工具、代码执行器等)组合成一个系统，而不是依赖单一大模型。",
        highlight: "未来AI系统的形态：组合优于单一",
        features: [
            "多组件协作",
            "各取所长",
            "更可控可解释",
            "易于迭代优化",
            "是RAG/Agent的延伸"
        ],
        tags: ["系统设计", "趋势", "Berkeley"]
    },
    
    // ========== 生态社区 ==========
    "huggingface": {
        name: "Hugging Face",
        english: "Hugging Face",
        category: "平台 · 模型社区",
        summary: "最大的AI模型和数据集社区，提供模型托管、数据集、Spaces应用部署等服务。是开源AI生态的核心枢纽。",
        highlight: "AI界的GitHub，开源模型的家园",
        features: [
            "海量开源模型",
            "数据集托管",
            "Transformers库",
            "Spaces应用部署",
            "推理API"
        ],
        tags: ["社区", "开源", "必用", "生态核心"]
    },
    
    "arxiv": {
        name: "arXiv",
        english: "arXiv",
        category: "资源 · 论文预印本",
        summary: "康奈尔大学运营的论文预印本平台，AI/ML领域的最新研究几乎都会第一时间发布在这里。",
        highlight: "获取AI最新研究的第一手来源",
        features: [
            "最新研究论文",
            "免费开放获取",
            "快速发布",
            "AI/ML论文首发地"
        ],
        tags: ["论文", "研究", "信息来源"]
    },
    
    "karpathy": {
        name: "Andrej Karpathy",
        english: "Andrej Karpathy",
        category: "资源 · 学习",
        summary: "前特斯拉AI总监、OpenAI创始成员，以高质量的深度学习教程著称。其YouTube频道和博客是学习神经网络的最佳资源之一。",
        highlight: "最好的神经网络教程创作者",
        features: [
            "从零实现神经网络",
            "GPT实现教程",
            "深入浅出讲解",
            "YouTube免费课程"
        ],
        tags: ["教程", "YouTube", "免费", "高质量"]
    },
    
    "deeplearning-ai": {
        name: "DeepLearning.AI",
        english: "DeepLearning.AI",
        category: "资源 · 学习平台",
        summary: "吴恩达创办的AI教育平台，提供系统的深度学习、LLM应用开发等课程，是入门AI的最佳选择之一。",
        highlight: "吴恩达的AI课程平台，系统学习首选",
        features: [
            "系统化课程",
            "吴恩达主讲",
            "LLM应用课程",
            "Coursera合作"
        ],
        tags: ["课程", "系统学习", "吴恩达"]
    }
};

// 别名映射
const aliasMap = {
    "gpt4": "gpt-4",
    "gpt-4o": "gpt-4",
    "gpt4o": "gpt-4",
    "claude3": "claude",
    "claude 3.5": "claude",
    "llama3": "llama",
    "llama 3": "llama",
    "mixtral": "mistral",
    "通义千问": "qwen",
    "sd": "stable-diffusion",
    "dalle": "dall-e",
    "dall-e 3": "dall-e",
    "思维链": "cot",
    "chain of thought": "cot",
    "思维树": "tot",
    "tree of thought": "tot",
    "o1": "o1",
    "o3": "o1",
    "o1 reasoning": "o1",
    "o3 reasoning": "o1",
    "react agent": "react",
    "多智能体": "multi-agent",
    "tool use": "tool-use",
    "工具调用": "function-calling",
    "autogen": "autogen",
    "langchain": "langchain",
    "llamaindex": "llamaindex",
    "llama index": "llamaindex",
    "langgraph": "langgraph",
    "检索增强生成": "rag",
    "向量嵌入": "embedding",
    "文档分块": "chunking",
    "graphrag": "graphrag",
    "graph rag": "graphrag",
    "lora": "lora",
    "qlora": "qlora",
    "人类反馈强化学习": "rlhf",
    "直接偏好优化": "dpo",
    "监督微调": "sft",
    "ggml": "gguf",
    "huggingface peft": "peft",
    "vllm": "vllm",
    "ollama": "ollama",
    "llama.cpp": "llama-cpp",
    "llamacpp": "llama-cpp",
    "github copilot": "copilot",
    "copilot": "copilot",
    "cursor": "cursor",
    "devin": "devin",
    "aider": "aider",
    "spec-driven dev": "sdd",
    "prompt engineering": "prompt-engineering",
    "提示工程": "prompt-engineering",
    "对齐": "alignment",
    "ai alignment": "alignment",
    "护栏": "guardrails",
    "幻觉": "hallucination",
    "提示注入": "prompt-injection",
    "langsmith": "langsmith",
    "专家混合": "moe",
    "mixture of experts": "moe",
    "mamba": "mamba",
    "ssm": "mamba",
    "长上下文": "long-context",
    "long context": "long-context",
    "test-time compute": "test-time-compute",
    "compound ai systems": "compound-ai",
    "复合ai系统": "compound-ai",
    "hugging face": "huggingface",
    "hf": "huggingface",
    "arxiv": "arxiv",
    "andrej karpathy": "karpathy",
    "karpathy": "karpathy",
    "deeplearning.ai": "deeplearning-ai",
    "吴恩达": "deeplearning-ai"
};

// 扩展findConcept函数使用别名
const originalFindConcept = typeof findConcept !== 'undefined' ? findConcept : null;

