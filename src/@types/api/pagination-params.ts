export interface PaginationParams {
  /**
   * O número da página a ser recuperada.
   */
  pageNumber?: number;

  /**
   * O número de itens por página.
   */
  pageSize?: number;

  /**
   * Nome da propriedade usada para ordenação (ex: "Name", "CreatedDate")
   */
  sortBy?: string;

  /**
   * Direção da ordenação (verdadeiro para ascendente, falso para descendente)
   */
  isAscending?: boolean;

  search?: string;
}