import type { Country } from '../../types';
import { CountryCard } from '../country-card/country-card';
import { getPopulationForYear, createYearDataMap } from '../../utils/data-transformers';
import { useMemo } from 'react';
import { List, type RowComponentProps} from 'react-window';

import styles from './country-list.module.css';

type CountryListProps = {
  countries: Country[];
  searchQuery: string;
  selectedColumns: string[];
  selectedRegion: string;
  selectedYear: number;
  sortField: 'name' | 'population';
  sortOrder: 'asc' | 'desc';
  onYearChange: (year: number) => void;
};

export const CountryList = ({
  countries,
  searchQuery,
  selectedColumns,
  selectedRegion,
  selectedYear,
  sortField,
  sortOrder,
}: CountryListProps) => {
  const yearMaps = useMemo(() => {
    return new Map(
      countries.map((country) => [
        country.id,
        createYearDataMap(country.data),
      ])
    );
  }, [countries]);

  const filteredCountries = useMemo(() => {
    const normalizedSearch = searchQuery.toLowerCase().trim();
    return countries
    .filter((c) => {
      const matchesSearch = !normalizedSearch || c.id.toLowerCase().includes(normalizedSearch);
      const matchesRegion = !selectedRegion || c.data.some((d) => d.region === selectedRegion);
      return matchesSearch && matchesRegion;
    })
    .sort((a, b) => {
      if (sortField === 'name') {
        return sortOrder === 'asc' ? a.id.localeCompare(b.id) : b.id.localeCompare(a.id);
      } else {
        const popA = getPopulationForYear(yearMaps.get(a.id)!, selectedYear) || 0;
        const popB = getPopulationForYear(yearMaps.get(b.id)!, selectedYear) || 0;
        return sortOrder === 'asc' ? popA - popB : popB - popA;
      }
    });
  }, [countries, searchQuery, selectedRegion, sortField, sortOrder, selectedYear, yearMaps]);

  const Row = ({ index, style }: RowComponentProps) => {
    const country = filteredCountries[index];
    return (
      <div style={style}>
        <CountryCard
          key={country.id}
          country={country}
          selectedYear={selectedYear}
          selectedColumns={selectedColumns}
        />
      </div>
    );
  };

  return (
    <div className={styles.countryList} >
      <List
        rowCount={filteredCountries.length}
        rowHeight={300}
        rowComponent={Row}
        rowProps={{}}
      />
    </div>
  );
};
