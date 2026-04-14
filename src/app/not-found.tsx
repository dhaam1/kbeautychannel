'use client';

/**
 * 로케일 정보가 없는 최상위 경로에서 404 발생 시 보여주는 페이지입니다.
 * 가장 단순하게 한국어로 구성했습니다.
 */
export default function GlobalNotFound() {
    return (
        <html lang="ko">
            <body style={{
                margin: 0,
                padding: 0,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                height: '100vh',
                fontFamily: 'Pretendard, system-ui, sans-serif',
                textAlign: 'center',
                backgroundColor: '#fff'
            }}>
                <h1 style={{ fontSize: '120px', color: '#f2f2f2', margin: 0 }}>404</h1>
                <h2 style={{ fontSize: '24px', color: '#1a1a1a', marginTop: '-40px', marginBottom: '20px' }}>
                    페이지를 찾을 수 없습니다
                </h2>
                <p style={{ color: '#666', fontSize: '16px', lineHeight: '1.6', marginBottom: '30px' }}>
                    요청하신 페이지가 존재하지 않거나 주소가 변경되었습니다.<br />
                    입력하신 주소를 다시 한번 확인해주세요.
                </p>
                <a
                    href="/kr"
                    style={{
                        display: 'inline-block',
                        padding: '14px 40px',
                        backgroundColor: '#1a1a1a',
                        color: '#fff',
                        textDecoration: 'none',
                        borderRadius: '100px',
                        fontWeight: 'bold',
                        fontSize: '15px'
                    }}
                >
                    홈으로 이동하기
                </a>
            </body>
        </html>
    );
}
