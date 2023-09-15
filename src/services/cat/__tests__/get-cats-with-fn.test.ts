import { HttpRequest } from '../../../helpers/http-request';
import { getCats } from '../get-cats';

describe('get_cats_list', () => {
  it('should return cats list', async () => {
    const page = 1;
    const limit = 10;

    const params = {
      page,
      limit,
      has_breeds: 1,
    };

    const mockGetRequestSuccess = jest.fn().mockResolvedValue(
      {
        error: undefined,
        response: [
          {
            id: 'zlpgGWqN7',
            url: 'https://cdn2.thecatapi.com/images/zlpgGWqN7.jpg',
            width: 3840,
            height: 2400,
          },
          {
            id: 'LSaDk6OjY',
            url: 'https://cdn2.thecatapi.com/images/LSaDk6OjY.jpg',
            width: 1080,
            height: 1080,
          },
        ],
      },
    );

    HttpRequest.prototype.setBaseUrl = jest.fn().mockReturnThis();
    HttpRequest.prototype.setPath = jest.fn().mockReturnThis();
    HttpRequest.prototype.addReqParams = jest.fn().mockReturnThis();
    HttpRequest.prototype.setLogger = jest.fn().mockReturnThis();
    HttpRequest.prototype.get = mockGetRequestSuccess;

    const expectedResponse = {
      httpStatus: 200,
      apiStatus: 1,
      message: 'success',
      data: {
        totalCount: 10,
        cats: [
          {
            id: 'zlpgGWqN7',
            url: 'https://cdn2.thecatapi.com/images/zlpgGWqN7.jpg',
            width: 3840,
            height: 2400,
          },
          {
            id: 'LSaDk6OjY',
            url: 'https://cdn2.thecatapi.com/images/LSaDk6OjY.jpg',
            width: 1080,
            height: 1080,
          },
        ],
      },
    };
    const result: any = await getCats(params);

    expect(result).toStrictEqual(expectedResponse);
    expect(result.data.cats.length).toBe(2);
  });

  it('should handle error', async () => {
    const mockGetRequestFailed = jest.fn().mockResolvedValue(
      {
        error: new Error('Should fail'),
        response: undefined,
      },
    );

    HttpRequest.prototype.setBaseUrl = jest.fn().mockReturnThis();
    HttpRequest.prototype.setPath = jest.fn().mockReturnThis();
    HttpRequest.prototype.addReqParams = jest.fn().mockReturnThis();
    HttpRequest.prototype.setLogger = jest.fn().mockReturnThis();
    HttpRequest.prototype.get = mockGetRequestFailed;

    const page = 1;
    const limit = 10;

    const params = {
      page,
      limit,
      has_breeds: 1,
    };

    const expectedResponse = {
      httpStatus: 200,
      apiStatus: 0,
      message: 'No results found',
      data: {
        totalCount: 0,
        cats: [],
      },
    };

    const result: any = await getCats(params);

    expect(result).toStrictEqual(expectedResponse);
    expect(result.data.cats.length).toBe(0);
  });
});
