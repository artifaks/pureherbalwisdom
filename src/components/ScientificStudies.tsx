
import React from 'react';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Herb } from '@/data/types';
import { FlaskConical, Calendar, Users, FileText } from 'lucide-react';
import { Button } from './ui/button';

interface ScientificStudiesProps {
  herb: Herb;
}

// This is placeholder data - in a real application, you would fetch this from your database
const getHerbStudies = (herbName: string) => {
  return [
    {
      title: `Antioxidant Properties of ${herbName} Extract`,
      year: 2020,
      authors: 'Johnson et al.',
      journal: 'Journal of Medicinal Plants Research',
      abstract: `This study investigated the antioxidant capacity of ${herbName.toLowerCase()} extract using various in vitro models. Results showed significant free radical scavenging activity, suggesting potential applications in preventing oxidative stress-related conditions.`,
      doi: '10.1234/jmpr.2020.01.023'
    },
    {
      title: `Effects of ${herbName} on Immune Function in a Randomized Clinical Trial`,
      year: 2018,
      authors: 'Garcia, Smith, and Wong',
      journal: 'International Journal of Herbal Medicine',
      abstract: `A double-blind, placebo-controlled study of 120 participants showed that daily supplementation with ${herbName.toLowerCase()} extract significantly enhanced natural killer cell activity and improved immune response markers compared to placebo.`,
      doi: '10.5678/ijhm.2018.05.012'
    },
    {
      title: `Bioactive Compounds in ${herbName}: Identification and Characterization`,
      year: 2017,
      authors: 'Patel and Rodrigues',
      journal: 'Phytochemistry',
      abstract: `Using HPLC and mass spectrometry, researchers identified 14 bioactive compounds in ${herbName.toLowerCase()}, including flavonoids, terpenoids, and phenolic acids. These compounds demonstrated various biological activities in preliminary screenings.`,
      doi: '10.9012/phytochem.2017.03.045'
    },
    {
      title: `Traditional Uses and Modern Applications of ${herbName}`,
      year: 2015,
      authors: 'Chen et al.',
      journal: 'Journal of Ethnopharmacology',
      abstract: `This comprehensive review examined the traditional medicinal uses of ${herbName.toLowerCase()} across different cultures and compared them with findings from modern research. Several traditional applications were found to have scientific basis.`,
      doi: '10.3456/jep.2015.12.001'
    }
  ];
};

const ScientificStudies: React.FC<ScientificStudiesProps> = ({ herb }) => {
  const studies = getHerbStudies(herb.name);
  
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-semibold mb-4 flex items-center">
        <FlaskConical className="mr-3 h-6 w-6 text-purple-600" />
        Scientific Research on {herb.name}
      </h2>
      
      <ScrollArea className="h-[500px] pr-4">
        <div className="space-y-6">
          {studies.map((study, idx) => (
            <div key={idx} className="bg-white/50 p-6 rounded-xl">
              <h3 className="text-lg font-medium mb-2">{study.title}</h3>
              
              <div className="flex flex-wrap gap-y-2 gap-x-4 mb-4 text-sm text-gray-600">
                <div className="flex items-center">
                  <Calendar className="h-4 w-4 mr-1" />
                  {study.year}
                </div>
                <div className="flex items-center">
                  <Users className="h-4 w-4 mr-1" />
                  {study.authors}
                </div>
                <div className="flex items-center">
                  <FileText className="h-4 w-4 mr-1" />
                  {study.journal}
                </div>
              </div>
              
              <p className="text-gray-700 mb-4">{study.abstract}</p>
              
              <Button variant="outline" size="sm" asChild>
                <a href={`https://doi.org/${study.doi}`} target="_blank" rel="noopener noreferrer">
                  View Study (DOI: {study.doi})
                </a>
              </Button>
            </div>
          ))}
          
          <div className="text-center p-4">
            <p className="text-gray-500 text-sm mb-2">Note: The studies above are for demonstration purposes.</p>
            <Button variant="secondary" asChild>
              <a href={`https://scholar.google.com/scholar?q=${herb.name}+medicinal+properties`} target="_blank" rel="noopener noreferrer">
                Find More Studies on Google Scholar
              </a>
            </Button>
          </div>
        </div>
      </ScrollArea>
    </div>
  );
};

export default ScientificStudies;
