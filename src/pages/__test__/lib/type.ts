export interface Person {
  id: string;
  name: string;
  into_time: string;
  phone: string;
  email: string;
  department: string;
  basic_wage: number;
  performance_pay: number;
  remaining_hj: number;
  remaining_cy: number;
}

export type PersonKey = keyof Person;

export type PersonKeyLabel = {
  [k in PersonKey]: {
    label: string;
  };
};
