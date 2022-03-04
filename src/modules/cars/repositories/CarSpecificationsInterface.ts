import { CarSpecificationEntity } from '../entities/CarSpecificationEntity';

interface ICreateCarSpecificationDto {
  name: string;
  description: string;
}

interface ICarSpecificationsRepository {
  create({ name, description }: ICreateCarSpecificationDto): Promise<void>;
  findByName(name: string): Promise<CarSpecificationEntity>;
}

export { ICreateCarSpecificationDto, ICarSpecificationsRepository }