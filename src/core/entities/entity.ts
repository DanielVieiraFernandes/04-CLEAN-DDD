import { UniqueEntityID } from "@/domain/forum/enterprise/entities/value-objects/unique-entity-id";

export class Entity<Props> {
    private _id: UniqueEntityID;
    protected props: Props

    get id(){
        return this._id
    }

    constructor(props: Props, id?: UniqueEntityID){
        this.props = props
        this._id = id ?? new UniqueEntityID(id)
    }
}