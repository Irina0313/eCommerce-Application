import * as IndexExports from './index'; // Импортируем все экспорты из index.ts

describe('Index exports', () => {
  it('exports Header', () => {
    expect(IndexExports.Header).toBeDefined();
  });

  // Если есть другие экспорты, добавьте аналогичные проверки
});
