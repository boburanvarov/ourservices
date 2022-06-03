export interface  Vacancies{
  resumes?: [],
  id?: number,
  created_at?: string,
  description?: string
  position?: Position
}

export interface  Position{
  id?: number,
  createdAt?: string
  name?: string,
  description?: string,
  department?: Departament
}

export interface  Departament {
  id?: 1,
  createdAt?: string,
  name?: string,
  description?: string
}
