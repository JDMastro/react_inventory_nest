

export function formatCurrency(value: any) {
    return new Intl.NumberFormat('es-CO', {
      style: 'currency',
      currency: 'COP',
      minimumFractionDigits: 0,
    }).format(value);
  }

  export function formatWeight(value: any) {
    return new Intl.NumberFormat('es-CO', {
      //style: 'currency',
      currency: 'COP',
      minimumFractionDigits: 0,
    }).format(value);
  }