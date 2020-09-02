const filterFilters = (filters: ServerResponse[]) => {
  if (filters.length === 1) return filters;

  const filterPositions = filters.map((filter, i) => {
    const arrBbo: number[] = JSON.parse(filter.bb_o);
    const center = [
      arrBbo[0] - arrBbo[2] / 2,
      arrBbo[1] - arrBbo[3] / 2,
    ];

    return {
      position: center,
      id: i,
    };
  });

  type Distance = {
    id: string;
    value: number;
  }

  const distances: Distance[] = [];

  filterPositions.forEach(({ position: positionA, id: idA }, i) => {
    const positionMinusCurrent = [...filterPositions];
    positionMinusCurrent.splice(i, 1);

    positionMinusCurrent.forEach(({ position: positionB, id: idB }) => {
      const distance = Math.hypot(
        positionA[0] - positionB[0],
        positionA[1] - positionB[1],
      );

      if (
        !distances.find(({ id }) => (
          id === `${idA}-${idB}`
          || id === `${idB}-${idA}`
        ))
      ) {
        distances.push({
          id: `${idA}-${idB}`,
          value: distance,
        });
      }
    });
  });

  const cancelledFilters: ServerResponse[] = [];

  const filteredFilters = distances.map((distance) => {
    const [idA, idB] = distance.id.split('-');
    const filterA = filters[Number(idA)];
    const filterB = filters[Number(idB)];

    if (distance.value < 150) {
      if (filterA.prob > filterB.prob) {
        cancelledFilters.push(filterB);
        return filterA;
      }
      cancelledFilters.push(filterA);
      return filterB;
    }

    return [filterA, filterB];
  });

  const flattenedFilters = filteredFilters.flat().filter((filter, i, self) => {
    return self.findIndex((filterJ) => filterJ.bb_o === filter.bb_o) === i;
  });

  return flattenedFilters.filter((filter) => {
    if (cancelledFilters.find((cFilter) => cFilter.bb_o === filter.bb_o)) {
      return false;
    }
    return true;
  });
};

export default filterFilters;

export interface ServerResponse {
  'bb_o': string;
  prob: number;
  label: 'mask' | 'nomask';
}
