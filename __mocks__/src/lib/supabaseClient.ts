export const getSupabaseClient = () => ({
  auth: {
    signIn: jest.fn(),
    signOut: jest.fn(),
  },
  from: jest.fn(() => ({
    select: jest.fn(() => ({
      eq: jest.fn(() => ({
        single: jest.fn(() => Promise.resolve({ data: {}, error: null })),
      })),
    })),
  })),
});
