type NationId = string;
type RegionId = string;
type SubRegionId = string;

export interface Variant {
  adjacency: {
    [regionId: RegionId]: {
      [regionId: RegionId]: "land" | "sea" | "coast";
    };
  };
  dimensions: {
    x: number;
    y: number;
  };
  name: string;
  nationality: {
    [regionId: RegionId]: NationId;
  };
  nations: {
    [nationId: NationId]: {
      name: string;
      color: string;
    };
  };
  regions: {
    [regionId: RegionId]: {
      name: string;
      shapes: {
        x: number;
        y: number;
      }[][];
      subRegions?: {
        [subRegionId: SubRegionId]: {
          name: string;
          shapes: {
            x: number;
            y: number;
          }[][];
        };
      };
      type: "land" | "sea";
    };
  };
  supplyCenters: {
    [regionId: RegionId]: NationId | "none";
  };
  units: {
    [nationId: NationId]: {
      [regionId: RegionId]: "army" | "fleet";
    };
  };
  year: number;
}
