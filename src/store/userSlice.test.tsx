import reducer, { UserState, setId } from './userSlice';

describe('userSlice test', () => {
  test('should return the initial state', () => {
    expect(reducer(undefined, { type: undefined })).toEqual({
      id: null,
    });
  });

  test('should handle a todo being added to an empty list', () => {
    const previousState: UserState = { id: null };

    expect(reducer(previousState, setId('1'))).toEqual({ id: '1' });
  });
});
