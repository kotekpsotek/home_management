import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm'

// Define the User entity
@Entity({ name: "users" })
export class User {
    @PrimaryGeneratedColumn()
    id!: string
    @Column()
    name!: string
}