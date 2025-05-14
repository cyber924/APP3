import { useState } from 'react';

export default function PromptRecommender() {
  const [goal, setGoal] = useState('블로그 글쓰기');
  const [style, setStyle] = useState('친근한');
  const [prompt, setPrompt] = useState('');

  const templates = {
    '블로그 글쓰기': {
      '친근한': '너는 따뜻하고 대화하듯 글을 쓰는 블로거야.\n📌 출력 형식: 제목 / 서론-본론-결론 / 질문 마무리\n📌 문체 지시: 말하듯 편안하게\n📎 출력 방식: 마크다운',
      '전문적인': '너는 콘텐츠 전략가야. 문제-해결-분석 구조로 작성해줘.\n📎 출력 방식: PDF, 마크다운',
    },
    '제품 설명': {
      '전문적인': '브랜드 마케터로서 제품 기능과 장점을 분석해줘.\n📌 출력 형식: 제목 / 주요 기능 / 요약 평가\n📎 PDF 형식',
    }
  };

  const generatePrompt = () => {
    const selected = templates[goal]?.[style] ?? '해당 조합의 프롬프트가 준비되지 않았습니다.';
    setPrompt(selected);
  };

  return (
    <div>
      <h2>🎯 AI 프롬프트 추천기</h2>
      <select value={goal} onChange={(e) => setGoal(e.target.value)}>
        {Object.keys(templates).map((g) => (
          <option key={g}>{g}</option>
        ))}
      </select>
      <select value={style} onChange={(e) => setStyle(e.target.value)}>
        {Object.keys(templates[goal] || {}).map((s) => (
          <option key={s}>{s}</option>
        ))}
      </select>
      <button onClick={generatePrompt}>프롬프트 생성</button>
      <pre>{prompt}</pre>
    </div>
  );
}
