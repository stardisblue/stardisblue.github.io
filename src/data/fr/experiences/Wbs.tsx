import { Experience } from '@/components/Experience';

export function Wbs() {
  return (
    <Experience
      title="Développeur Full Stack"
      place="WBS, Montpellier"
      dates={['2015-03', '2015-07']}
      keywords={['Web', 'PHP5.3', 'jQuery', 'VoIP', 'SOAP']}
    >
      <p>Integration d'une couche VOIP dans une plateforme web d'ERP.</p>
    </Experience>
  );
}
