import { Request, Response } from "express";

// Get all demos
// This is the index method, which retrieves all demos
export const index = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    res.status(200).json({ success: true, message: "Retrived successfully" });
    return
  } catch (error) {
    res
      .status(400)
      .json({ success: false, message: "internal server error", error });
    return
  }
};

// Get a single demo by ID
// This is the show method, which retrieves a single demo by ID
// The ID is passed as a parameter in the request
export const show = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    res.status(200).json({ success: true, message: "Retrived successfully" });
    return
  } catch (error) {
    res
      .status(400)
      .json({ success: false, message: "internal server error", error });
    return
  }
};

// Create a new demo create/store same thing
// This is the create method, which creates a new demo
// The data for the new demo is passed in the request body
export const create = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    res.status(200).json({ success: true, message: "Created successfully" });
    return
  } catch (error) {
    res
      .status(400)
      .json({ success: false, message: "internal server error", error });
    return
  }
};

// Update a demo by ID
// This is the update method, which updates a demo by ID
// The ID is passed as a parameter in the request
export const update = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    res.status(200).json({ success: true, message: "Updated successfully" });
    return
  } catch (error) {
    res
      .status(400)
      .json({ success: false, message: "internal server error", error });
    return
  }
};

// Delete a demo by ID
// This is the destroy method, which deletes a demo by ID
// The ID is passed as a parameter in the request
export const destroy = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    res.status(200).json({ success: true, message: "Deleted successfully" });
    return
  } catch (error) {
    res
      .status(400)
      .json({ success: false, message: "internal server error", error });
    return
  }
};
