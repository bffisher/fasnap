import { AssetItemEntity } from "./assetItem.entity";

export interface SnapshotEntity{
  date: string;
  amount: number;
  assetItems: AssetItemEntity[];
}