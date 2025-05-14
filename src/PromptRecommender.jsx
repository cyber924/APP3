import { useState } from 'react';

export default function PromptRecommender() {
  const [goal, setGoal] = useState('블로그 글쓰기');
  const [style, setStyle] = useState('감성적인');
  const [subject, setSubject] = useState('');
  const [prompt, setPrompt] = useState('');

  const templates = {
    '블로그 글쓰기': {
      '감성적인': `너는 감성적인 에세이 작가야. 주제는 "{{subject}}"야.
📌 출력 형식: 감성적인 흐름 / 여운 있는 마무리
📌 문체 지시: 따뜻하고 서정적으로 써줘
📎 출력 방식: 마크다운`
    },
    '제품 설명': {
      '전문적인': `너는 브랜드 마케터야. "{{subject}}" 제품을 설명해줘.
📌 출력 형식: 제품명 / 기능 요약 / 기술 설명
📌 문체 지시: 전문가 어조
📎 출력 방식: PDF`
    }
  };

  const generatePrompt = () => {
    const base = templates[goal]?.[style] ?? '해당 조합의 프롬프트가 준비되지 않았습니다.';
    const filled = base.replaceAll('{{subject}}', subject);
    setPrompt(filled);
  };

  const copyPrompt = () => {
    navigator.clipboard.writeText(prompt);
    alert('프롬프트가 복사되었습니다!');
  };

  const savePrompt = () => {
    const blob = new Blob([prompt], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'prompt.txt';
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="container">
      <h2>🎯 AI 프롬프트 추천기</h2>
      <label>창작 목적</label>
      <select value={goal} onChange={(e) => setGoal(e.target.value)}>
        {Object.keys(templates).map((g) => (
          <option key={g}>{g}</option>
        ))}
      </select>
      <label>스타일</label>
      <select value={style} onChange={(e) => setStyle(e.target.value)}>
        {Object.keys(templates[goal] || {}).map((s) => (
          <option key={s}>{s}</option>
        ))}
      </select>
      <label>주제 입력</label>
      <input
        type="text"
        value={subject}
        onChange={(e) => setSubject(e.target.value)}
        placeholder="예: 디지털 노마드의 삶"
      />
      <button onClick={generatePrompt}>프롬프트 생성</button>
      <textarea readOnly value={prompt} />
      <div className="copy-save">
        <button onClick={copyPrompt}>복사하기</button>
        <button onClick={savePrompt}>저장하기</button>
      </div>
    </div>
  );
}
