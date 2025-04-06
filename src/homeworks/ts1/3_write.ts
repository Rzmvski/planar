import {
  citiesDictionary,
  costTypesDictionary,
  profitTypesDictionary,
  ticketTypesDictionary,
} from 'src/homeworks/ts1/dictionary';

/**
 * Функции написанные здесь пригодятся на последующих уроках
 * С помощью этих функций мы будем добавлять элементы в список для проверки динамической загрузки
 * Поэтому в идеале чтобы функции возвращали случайные данные, но в то же время не абракадабру.
 * В целом сделайте так, как вам будет удобно.
 * */

/**
 * Нужно создать тип Category, он будет использоваться ниже.
 * Категория содержит
 * - id (строка)
 * - name (строка)
 * - photo (строка, необязательно)
 **/
type Category = {
  id: string;
  name: string;
  photo?: string;
};

/**
 * Продукт (Product) содержит
 * - id (строка)
 * - name (строка)
 * - photo (строка)
 * - desc (строка, необязательно)
 * - createdAt (строка)
 * - oldPrice (число, необязательно)
 * - price (число)
 * - category (Категория)
 **/
type Product = {
  id: string;
  name: string;
  photo: string;
  desc?: string;
  createdAt: string;
  oldPrice?: number;
  price: number;
  category: Category;
};

/**
 * Операция (Operation) может быть либо тратой (Cost), либо доходом (Profit)
 **/
type Operation = Cost | Profit;

/**
 * Трата (Cost) содержит
 * - id (строка)
 * - name (строка)
 * - desc (строка, необязательно)
 * - createdAt (строка)
 * - amount (число)
 * - category (Категория)
 * - type ('Cost')
 **/
type Cost = {
  id: string;
  name: string;
  desc?: string;
  createdAt: string;
  amount: number;
  category: Category;
  type: 'Cost';
};

/**
 * Доход (Profit) содержит
 * - id (строка)
 * - name (строка)
 * - desc (строка, необязательно)
 * - createdAt (строка)
 * - amount (число)
 * - category (Категория)
 * - type ('Profit')
 * */
type Profit = {
  id: string;
  name: string;
  desc?: string;
  createdAt: string;
  amount: number;
  category: Category;
  type: 'Profit';
};

const generateRandomNumber = (min: number, max: number) => {
  return Math.floor(Math.random() * (max - min) + min);
};

const getRandomItem = <T>(array: T[]): T => {
  const index = generateRandomNumber(0, array.length - 1);
  return array[index];
};

const generateItemId = () => {
  const itemNumber = generateRandomNumber(0, 10_000_000);
  return `ID_${itemNumber}`;
};

const getPhotoById = (id: string) => `photos/${id}.jpeg`;

/**
 * Создает случайный продукт (Product).
 * Принимает дату создания (строка)
 * */
export const createRandomProduct = (createdAt: string): Product => {
  const productId = generateItemId();
  const categoryId = generateItemId();
  const getTicketName = (): string => {
    const source = getRandomItem(citiesDictionary);
    const destination = getRandomItem(citiesDictionary);

    return `${source} - ${destination}`;
  };

  return {
    id: productId,
    name: getTicketName(),
    photo: getPhotoById(productId),
    price: generateRandomNumber(5_000, 100_000),
    oldPrice: generateRandomNumber(5_000, 100_000),
    category: {
      id: categoryId,
      name: getRandomItem(ticketTypesDictionary),
      photo: getPhotoById(categoryId),
    },
    desc: 'some product',
    createdAt,
  };
};

const getTypeAndDictionary = (): { type: 'Cost' | 'Profit'; dictionary: string[] } => {
  const type = Math.random() > 0.5 ? 'Profit' : 'Cost';
  switch (type) {
    case 'Cost':
      return { type, dictionary: costTypesDictionary };
    case 'Profit':
      return { type, dictionary: profitTypesDictionary };
  }
};

/**
 * Создает случайную операцию (Operation).
 * Принимает дату создания (строка)
 * */
export const createRandomOperation = (createdAt: string): Operation => {
  const productId = generateItemId();
  const categoryId = generateItemId();
  const { type, dictionary } = getTypeAndDictionary();

  return {
    id: productId,
    name: getRandomItem(dictionary),
    amount: generateRandomNumber(5_000, 100_000),
    category: {
      id: categoryId,
      name: getRandomItem(ticketTypesDictionary),
      photo: getPhotoById(categoryId),
    },
    desc: 'some operation',
    type,
    createdAt,
  };
};
