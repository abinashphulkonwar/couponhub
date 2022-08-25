export default interface UserCreateDataInterface {
  id: string;
  body?: {
    id: string;
    email: string;
    __v: number;
    createAted?: string;
  };
}
