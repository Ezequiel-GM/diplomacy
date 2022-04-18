import { Point } from "./Point";

export type OverlayFill = "land" | "sea";
export type RegionType = "land" | "sea" | "archipelago";
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
    [regionId: RegionId]: Region;
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

export interface Region {
  name: string;
  shape: Point[];
  subRegions?: {
    [subRegionId: SubRegionId]: {
      name: string;
      shape: Point[];
      visuals: {
        labelLocation: Point;
        troopLocation: Point;
      };
    };
  };
  type: RegionType;
  visuals: {
    labelLocation: Point;
    supplyCenterLocation?: Point;
    troopLocation: Point;
    overlays?: {
      border: boolean;
      fill: OverlayFill;
      shape: Point[];
    }[];
  };
}
