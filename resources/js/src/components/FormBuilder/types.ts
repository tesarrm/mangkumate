export interface FormElement {
  id: string;
  type: string; // 'input', 'textarea', 'select', 'button', dll.
  sectionId: string; // ID section tempat elemen berada
  columnId: string; // ID column tempat elemen berada
  order: number; // Urutan elemen dalam column
  label?: string; // Opsional
  name?: string; // Opsional (variable name)
  length?: number; // Opsional
  mandatory?: boolean; // Opsional
  notNullable?: boolean; // Opsional
  options?: string[]; // Opsional (untuk select)
  defaultValue?: string; // Opsional
  hidden?: boolean; // Opsional
  readOnly?: boolean; // Opsional
  unique?: boolean; // Opsional
  description?: string; // Opsional
  placeholder?: string; // Opsional
  tableColumns?: TableColumn[]; // Opsional (untuk table)
}

export interface TableColumn {
  id: string; // ID unik untuk kolom tabel
  label?: string; // Opsional
  name?: string; // Opsional (variable name)
  type: string; // Misalnya: 'text', 'number', 'date', dll.
  length?: number; // Opsional
  mandatory?: boolean; // Opsional
  notNullable?: boolean; // Opsional
  options?: string[]; // Opsional (untuk select)
  defaultValue?: string; // Opsional
  hidden?: boolean; // Opsional
  readOnly?: boolean; // Opsional
  unique?: boolean; // Opsional
  description?: string; // Opsional
  placeholder?: string; // Opsional
}

export interface Column {
  id: string;
  sectionId: string; // ID section tempat column berada
  label?: string; // Opsional
  name?: string; // Opsional (variable name)
  description?: string; // Opsional
}

export interface Section {
  id: string;
  columns: Column[]; // Daftar column dalam section
  label?: string; // Opsional
  name?: string; // Opsional (variable name)
  description?: string; // Opsional
}

export interface FormData {
  sections: Section[];
  elements: FormElement[];
}