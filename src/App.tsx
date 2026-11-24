import {CatalogueSection} from './components/CatalogueSection';
import {Footer} from './components/Footer';
import {GuideSection} from './components/GuideSection';
import {Header} from './components/Header';
import {Hero} from './components/Hero';
import {useAssessments} from './hooks/useAssessments';
import {usePrefersReducedMotion} from './hooks/usePrefersReducedMotion';
import type {UseAssessmentsOptions} from './types/assessment';

export interface AppProps {
  catalogueOptions?: UseAssessmentsOptions;
}

export default function App({catalogueOptions}: AppProps) {
  const {tools, status, errorMessage, retry} = useAssessments(catalogueOptions);
  const prefersReducedMotion = usePrefersReducedMotion();

  return (
    <>
      <a className="skip-link" href="#main-content">
        Skip to content
      </a>

      <Header />

      <main id="main-content">
        <Hero />
        <CatalogueSection
          tools={tools}
          status={status}
          errorMessage={errorMessage}
          onRetry={retry}
          prefersReducedMotion={prefersReducedMotion}
        />
        {status === 'ready' ? <GuideSection tools={tools} /> : null}
      </main>

      <Footer />
    </>
  );
}
