import { Point } from "./Point";

type NationId = string;
type RegionId = string;
type RegionType = "land" | "sea" | "archipelago";
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
      shape: Point[];
      subRegions?: {
        [subRegionId: SubRegionId]: {
          name: string;
          shape: Point[];
          troopLocation: Point;
        };
      };
      type: RegionType;
      visuals?: {
        supplyCenterLocation?: Point;
        troopLocation?: Point;
        overlays?: {
          border: boolean;
          shape: Point[];
          type: RegionType;
        }[];
      };
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
