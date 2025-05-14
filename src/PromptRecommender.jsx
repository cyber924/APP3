import { useState } from 'react';

export default function PromptRecommender() {
  const [goal, setGoal] = useState('블로그 글쓰기');
  const [style, setStyle] = useState('친근한');
  const [prompt, setPrompt] = useState('');

  const templates = {
    '블로그 글쓰기': {
      '친근한': '너는 따뜻하고 대화하듯 글을 쓰는 블로거야.\n📌 출력 형식: 제목 / 서론-본론-결론 / 질문 마무리\n📌 문체 지시: 말하듯 편안하게\n📎 출력 방식: 마크다운',
    },
  };

  const generatePrompt = () => {
    const selected = templates[goal]?.[style] ?? '해당 조합의 프롬프트가 준비되지 않았습니다.';
    setPrompt(selected);
  };

  return (
    <div>
      <h2>🎯 AI 프롬프트 추천기</h2>
      <select onChange={(e) => setGoal(e.target.value)} value={goal}>
        <option>블로그 글쓰기</option>
      </select>
      <select onChange={(e) => setStyle(e.target.value)} value={style}>
        <option>친근한</option>
      </select>
      <button onClick={generatePrompt}>프롬프트 생성</button>
      <pre>{prompt}</pre>
    </div>
  );
}
