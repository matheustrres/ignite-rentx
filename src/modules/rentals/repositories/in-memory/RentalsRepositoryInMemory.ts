import { RentalEntity } from '@modules/rentals/infra/typeorm/entities/RentalEntity';
import { IRentalsRepository } from '../RentalsInterface';
import { ICreateRentalDto } from '@modules/rentals/dtos/CreateRentalDto';

class RentalsRepositoryInMemory implements IRentalsRepository {
  private rentals: RentalEntity[] = []

  async create({ user_id, car_id, expected_return_date }: ICreateRentalDto): Promise<RentalEntity> {
    const rentalData: RentalEntity = new RentalEntity()

    Object.assign(rentalData, {
      user_id,
      car_id,
      expected_return_date,
      start_date: new Date()
    })

    this.rentals.push(rentalData)

    return rentalData
  }

  async findRentalByCarId(car_id: string): Promise<RentalEntity> {
    const rentalData: RentalEntity = this.rentals.find((rental) => {
      return rental.car_id === car_id &&
        !Boolean(rental.end_date)
    })

    return rentalData
  }

  async findRentalByUserId(user_id: string): Promise<RentalEntity> {
    const userData: RentalEntity = this.rentals.find((rental) => {
      return rental.user_id === user_id &&
        !Boolean(rental.end_date)
    })

    return userData
  }
}

export { RentalsRepositoryInMemory }