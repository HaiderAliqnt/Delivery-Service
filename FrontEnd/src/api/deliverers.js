const delay = (ms = 500) => new Promise((resolve) => setTimeout(resolve, ms));

export const getAvailable = async () => {
  await delay();
  return [
    { id: 101, name: 'Mogger', rating: '4.8', avatar: null },
    { id: 102, name: 'Chudcel', rating: '4.5', avatar: null },
    { id: 103, name: 'Chad lite', rating: '4.9', avatar: null }
  ];
}
