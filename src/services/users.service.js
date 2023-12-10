import { getUserById } from '../repositories/users.repository.js';

export const getMeService = async (userId) => {
    return getUserById(userId);
};
