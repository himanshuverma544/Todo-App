let isTodosLoadedValue = false;

export function setIsTodoLoaded(value)
{
  setTimeout(() => {
    isTodosLoadedValue = value;
  }, 1000)
}

export function isTodosLoaded()
{
  return isTodosLoadedValue;
}

