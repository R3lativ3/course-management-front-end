export default interface Course {
  capacity: number;
  created_at: Date | null;
  created_by: any | null;
  credits: number;
  deleted: boolean;
  deleted_at: Date;
  deleted_by: Date;
  description: string;
  id: number;
  name: string;
  price: number;
  updated_at: Date | null;
  updated_by: Date | null;
}
