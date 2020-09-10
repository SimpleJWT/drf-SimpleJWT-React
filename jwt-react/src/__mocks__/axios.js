const mockAxios = jest.genMockFromModule('axios');

mockAxios.create.mockReturnThis();

export default mockAxios;
