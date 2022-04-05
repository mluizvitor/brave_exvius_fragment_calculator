interface Unit {
  id: string;
  name: string;
  ex_level: number;
  fragments: number;
  extra_units: number;
  nva: boolean;
  fragment_needed: number;
  can_awaken: boolean;
}

type UnitInputProps = Omit<Unit, 'id' | 'fragment_needed' | 'can_awaken'>;
