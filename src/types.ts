export interface Location {
  id: string;
  name: string;
  parentId?: string | null;
  type: 'location';
  children: Array<Location | Asset>;
}

export interface Asset {
  id: string;
  name: string;
  locationId?: string | null;
  parentId?: string | null;
  sensorType?: string | null;
  sensorId?: string | null;
  status?: 'operating' | 'alert' | 'critical' | null;
  gatewayId?: string | null;
  type: 'asset' | 'component';
  children: Asset[];
}

export interface Company {
  id: string;
  name: string;
}
