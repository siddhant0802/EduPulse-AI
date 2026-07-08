import bcrypt from "bcrypt";
import {
  model,
  Schema,
  type HydratedDocument,
  type Model,
} from "mongoose";

/**
 * User Roles
 */
export type UserRole =
  | "admin"
  | "teacher"
  | "student";

/**
 * User Fields
 */
export interface UserFields {
  name: string;
  email: string;
  password: string;
  role: UserRole;
}

/**
 * User Methods
 */
interface UserMethods {
  comparePassword(candidatePassword: string): Promise<boolean>;
}

/**
 * User Model
 */
type UserModel = Model<UserFields, {}, UserMethods>;

export type UserDocument = HydratedDocument<
  UserFields,
  UserMethods
>;

/**
 * User Schema
 */
const userSchema = new Schema<
  UserFields,
  UserModel,
  UserMethods
>(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },

    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },

    password: {
      type: String,
      required: true,
      minlength: 8,
      select: false,
    },

    role: {
      type: String,
      enum: ["admin", "teacher", "student"],
      default: "student",
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

/**
 * Hash password before saving
 */
userSchema.pre("save", async function () {
  if (!this.isModified("password")) {
    return;
  }

  this.password = await bcrypt.hash(this.password, 10);
});

/**
 * Compare password
 */
userSchema.methods.comparePassword = function (
  candidatePassword: string
) {
  return bcrypt.compare(
    candidatePassword,
    this.password
  );
};

/**
 * Export User Model
 */
export const User = model<UserFields, UserModel>(
  "User",
  userSchema
);