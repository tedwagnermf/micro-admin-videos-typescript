import { Entity } from "../../shared/domain/entity";
import { EntityValidateError } from "../../shared/domain/validators/validation.error";
import { Uuid } from "../../shared/domain/value-objects/uuid.vo";
import { ValueObject } from "../../shared/domain/value-objects/value-object";
import { CategoryValidatorFactory } from "./category.validator";

export type CategoryConstructorProps = {
    category_id?: Uuid;
    name: string;
    description?: string | null;
    is_active?: boolean;
    created_at?: Date;
}

export type CategoryCreateCommand = {
    name: string;
    description?: string | null;
    is_active?: boolean;
}

export type CategoryUpdateProps = {
    name: string;
    description?: string | null;
}
export class Category  extends Entity {
    category_id: Uuid;
    name: string;
    description: string | null;
    is_active: boolean;
    created_at: Date;

    // criacao a partir do banco de dados (hidratar)
    constructor(props: CategoryConstructorProps) {
        super();
        this.category_id = props.category_id || new Uuid();
        this.name = props.name;
        this.description = props.description ?? null;
        this.is_active = props.is_active ?? true;
        this.created_at = props.created_at ?? new Date();
    }

    static create(props: CategoryCreateCommand): Category {
        const category = new Category(props);
        Category.validate(category);
        return category;
    }

    get entity_id(): ValueObject {
        return this.category_id;
    }

    changeName(name: string): void {
        this.name = name;
        Category.validate(this);
    }

    changeDescription(description: string): void {
        this.description = description;
        Category.validate(this);
    }

    activate() {
        this.is_active = true;
        Category.validate(this);
    }

    deactivate() {
        this.is_active = false;
        Category.validate(this);
    }

    update(props: CategoryUpdateProps) {
        this.name = props.name;
        this.description = props.description;
        Category.validate(this);
    }

    static validate(entity: Category) {
        const validator = CategoryValidatorFactory.create();
        const isvalid = validator.validate(entity);

        if (! isvalid) {
            throw new EntityValidateError(validator.errors);
        }
    }

    toJSON() {
        return {
            category_id: this.category_id.id,
            name: this.name,
            description: this.description,
            is_active: this.is_active,
            created_at: this.created_at,
        };
    }
}