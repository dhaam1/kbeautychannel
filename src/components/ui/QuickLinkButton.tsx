import { Link } from '@/i18n/routing';

interface QuickLinkButtonProps {
  href?: string;
  onClick?: () => void;
  children?: React.ReactNode;
  borderless?: boolean;
}

export function QuickLinkButton({ href, onClick, children = '바로가기', borderless = false }: QuickLinkButtonProps) {
  const buttonStyle: React.CSSProperties = {
    display: 'flex',
    width: '100px',
    height: '32px',
    justifyContent: 'center',
    alignItems: 'center',
    gap: '10px',
    color: '#000',
    textAlign: 'center',
    fontFamily: 'Pretendard, sans-serif',
    fontSize: '14px',
    fontStyle: 'normal',
    fontWeight: 400,
    lineHeight: 'normal',
    textDecoration: 'none',
    cursor: 'pointer',

    border: borderless ? 'none' : '1px solid rgba(0, 0, 0, 0.70)',
    backgroundColor: '#fff',
    borderRadius: '999px',
  };

  const content = (
    <div style={buttonStyle} onClick={onClick}>
      {children}
    </div>
  );

  if (href) {
    return (
      <Link href={href as any} style={{ textDecoration: 'none' }}>
        {content}
      </Link>
    );
  }

  return content;
}