import { inject, injectable } from 'tsyringe';

import { CarSpecificationEntity } from '@modules/cars/infra/typeorm/entities/CarSpecificationEntity';
import { ICarSpecificationsRepository } from '@modules/cars/repositories/CarSpecificationsInterface';

import { AppError } from '@shared/errors/app.error';

interface ICarSpecificationRequest {
  name: string;
  description: string;
}

@injectable()
class CreateCarSpecificationUseCase {
  constructor(
    @inject('CarSpecificationsRepository')
    private _specificationsRepository: ICarSpecificationsRepository
  ) { }

  async perform({ name, description }: ICarSpecificationRequest): Promise<void> {
    const specificationData: CarSpecificationEntity = await this._specificationsRepository.findByName(name)

    if (specificationData) {
      throw new AppError(
        'Car specification already exists!'
      )
    }

    await this._specificationsRepository.create({
      name,
      description
    })
  }
}

export { CreateCarSpecificationUseCase }