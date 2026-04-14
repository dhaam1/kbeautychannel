'use client';

import { useState, useRef, useEffect } from 'react';
import { formatConsultNote, parseConsultNote } from '@/lib/admin/consultNotes';

interface InlineEditorProps {
  value: string;
  onSave: (value: string) => void;
  placeholder?: string;
  multiline?: boolean;
}

export function InlineEditor({ value, onSave, placeholder = '입력...', multiline = false }: InlineEditorProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [editValue, setEditValue] = useState(value);
  const inputRef = useRef<HTMLInputElement | HTMLTextAreaElement>(null);

  useEffect(() => {
    if (isEditing && inputRef.current) {
      inputRef.current.focus();
      if (inputRef.current instanceof HTMLTextAreaElement) {
        inputRef.current.style.height = 'auto';
        inputRef.current.style.height = `${inputRef.current.scrollHeight}px`;
      }
    }
  }, [isEditing]);

  const handleClick = () => {
    setIsEditing(true);
    // 상담 메모의 경우 날짜 부분을 제거하고 내용만 편집
    const parsed = parseConsultNote(value);
    setEditValue(parsed.content || value);
  };

  const handleSave = () => {
    // 빈 값이면 입력... 표시
    const finalValue = editValue.trim() || placeholder;
    onSave(finalValue);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setEditValue(value);
    setIsEditing(false);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !multiline) {
      e.preventDefault();
      handleSave();
    } else if (e.key === 'Escape') {
      handleCancel();
    } else if (e.key === 'Enter' && multiline && (e.ctrlKey || e.metaKey)) {
      e.preventDefault();
      handleSave();
    }
  };

  const handleBlur = () => {
    // 약간의 지연을 두어 클릭 이벤트가 먼저 처리되도록 함
    setTimeout(() => {
      handleSave();
    }, 200);
  };

  if (isEditing) {
    if (multiline) {
      return (
        <textarea
          ref={inputRef as React.RefObject<HTMLTextAreaElement>}
          value={editValue}
          onChange={(e) => {
            setEditValue(e.target.value);
            e.target.style.height = 'auto';
            e.target.style.height = `${e.target.scrollHeight}px`;
          }}
          onBlur={handleBlur}
          onKeyDown={handleKeyDown}
          className="w-full px-2 py-1 border border-blue-500 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none min-h-[60px]"
          placeholder={placeholder}
        />
      );
    }

    return (
      <input
        ref={inputRef as React.RefObject<HTMLInputElement>}
        type="text"
        value={editValue}
        onChange={(e) => setEditValue(e.target.value)}
        onBlur={handleBlur}
        onKeyDown={handleKeyDown}
        className="w-full px-2 py-1 border border-blue-500 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
        placeholder={placeholder}
      />
    );
  }

  const displayValue = value || placeholder;
  const isPlaceholder = !value;

  return (
    <div
      onClick={handleClick}
      className={`
        px-2 py-1 rounded cursor-pointer min-h-[32px] flex items-center
        ${isPlaceholder ? 'text-gray-400 italic' : 'text-gray-900'}
        hover:bg-gray-50 transition-colors
        ${multiline ? 'whitespace-pre-wrap break-words' : 'truncate'}
      `}
      title={multiline ? displayValue : undefined}
    >
      {displayValue}
    </div>
  );
}
