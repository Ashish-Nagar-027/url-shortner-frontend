

  export const formateDate = (date: string) => {
    const dateF = new Date(date);
    return new Intl.DateTimeFormat("en-US", {
      dateStyle: "long",
    }).format(dateF);
  };