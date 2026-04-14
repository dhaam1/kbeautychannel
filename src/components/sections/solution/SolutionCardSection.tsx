import { useTranslations } from 'next-intl';
import Image from 'next/image';
import { Link } from '@/i18n/routing';

export function SolutionCardSection() {
  const t = useTranslations('solutionCard');

  const solutions = [
    {
      id: 'implant',
      image: '/assets/asset-136.webp',
      href: '/special/implant',
    },
    {
      id: 'laminate',
      image: '/assets/asset-137.webp',
      href: '/special/laminate',
    },
    {
      id: 'orthodontics',
      image: '/assets/asset-138.webp',
      href: '/special/orthodontics',
    },
    {
      id: 'whitening',
      image: '/assets/asset-139.webp',
      href: '/special/whitening',
    }
  ];

  return (
    <section className="w-full bg-white">
      <div className="mx-auto w-full h-auto px-[30px] md:px-[80px] xl-custom:px-0" style={{ maxWidth: '1472px' }}>
        <div className="flex flex-col items-start text-left pt-[60px] md:pt-[67px] pb-[50px] md:pl-0 xl-custom:pl-[80px]">
          <h2
            style={{
              color: '#000',
              fontSize: '18px',
              fontStyle: 'normal',
              fontWeight: 400,
              lineHeight: '30px',
              letterSpacing: '-0.18px',
              paddingBottom: '10px',
            }}
          >
            {t('category')}
          </h2>
          <p
            className="whitespace-pre-line"
            style={{
              color: '#000',
              fontSize: '28px',
              fontStyle: 'normal',
              fontWeight: 400,
              lineHeight: '40px',
              letterSpacing: '-0.28px',
              paddingBottom: '50px',
            }}
          >
            {t('title1')}
          </p>
          <p
            style={{
              color: '#000',
              fontSize: '28px',
              fontStyle: 'normal',
              fontWeight: 500,
              lineHeight: '40px',
              letterSpacing: '-0.28px',
            }}
          >
            {t('title2')}
          </p>
        </div>

        <div className="relative pb-[60px] md:pb-[100px]">
          <div
            className="grid grid-cols-1 md:grid-cols-2 xl-custom:flex xl-custom:flex-wrap xl-custom:justify-center gap-[34px] justify-items-center"
            style={{ position: 'relative', zIndex: 50 }}
          >
            {solutions.map((solution) => (
              <div key={solution.id} className="w-full xl-custom:w-auto" style={{ opacity: 1, transform: 'none' }}>
                <div
                  className="relative flex flex-col flex-shrink-0 w-full md:w-[340px] md:h-[530px] xl-custom:w-[300px] xl-custom:h-[484px]"
                  style={{ borderRadius: '0px' }}
                >
                  <div
                    className="relative flex-shrink-0 w-full aspect-[300/220] md:h-[250px] xl-custom:h-[220px] border border-white border-b-0 bg-gray-100 overflow-hidden"
                    style={{ borderRadius: '0px' }}
                  >
                    <Image
                      src={solution.image}
                      alt={t(`items.${solution.id}.title`)}
                      fill
                      className="object-cover"
                      sizes="(max-width: 768px) 100vw, 340px"
                    />
                  </div>
                  <div
                    className="relative flex flex-col px-[20px] pt-[20px] pb-[20px] border border-white bg-white w-full md:h-[280px] xl-custom:h-[264px]"
                   
                  >
                    <h3
                      className="mb-[12px] text-left"
                      style={{ color: '#262626', fontSize: '20px', fontWeight: 500, letterSpacing: '-0.2px' }}
                    >
                      {t(`items.${solution.id}.title`)}
                    </h3>
                    <p
                      className="flex-grow overflow-y-auto text-left mb-4 whitespace-pre-line"
                      style={{ color: '#262626', fontSize: '16px', fontWeight: 400, letterSpacing: '-0.16px', lineHeight: 'normal' }}
                    >
                      {t(`items.${solution.id}.description`)}
                    </p>

                    <Link
                      href={solution.href as any}
                      className="flex items-center gap-1 cursor-pointer hover:opacity-70 transition-opacity self-end"
                      style={{ color: '#262626', fontSize: '16px', fontWeight: 400, letterSpacing: '-0.16px' }}
                    >
                      <span>{t(`items.${solution.id}.more`)}</span>
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}