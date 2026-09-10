import { Company } from "../models/company.model.js";

// register the company...

export const registerCompany = async (req, res) => {
    try {
        const { companyName } = req.body;
        if (!companyName) {
            return res.status(400).json({
                message: "Company name is required.",
                success: false
            })
        }

        let company = await Company.findOne({ name: companyName });

        if (company) {
            return res.status(400).json({
                message: "you can't register same company",
                success: false
            })
        }

        company = await Company.create({
            name: companyName,
            userId: req.id
        })

        return res.status(201).json({
            message: "company registered successfully.",
            company,
            success: true,
        })

    } catch (error) {
        console.log(error);
    }
}

// get the company...

export const getCompany = async (req, res) => {
    try {
        const userId = req.id;  // logged In user ID

        const companies = await Company.find({ userId });
        if (!companies) {
            return res.status(404).json({
                message: "companies not found.",
                success: false,
            })
        }

    } catch (error) {
        console.log(error);
    }
}

// Get Company By ID...

export const getCompanyById = async (req, res) => {
    try {
        const companyId = req.params.id;
        const company = await Company.findById(companyId);

        if (!company) {
            return res.status(404).json({
                message: "company Not found.",
                success: false,
            })
        }

        return res.status(200).json({
            company,
            success: true,
        });

    } catch (error) {
        console.log(error);
    }
}

// Update the company ...

export const updateCompany = async (req, res) => {
    try {
        const { name, description, website, location } = req.body;
        const file = req.file;
        // cloudinary.....

        const updateData = { name, description, website, location }

        const company = await Company.findByIdAndUpdate(req.params.id, updateData, { new: true });

        if (!company) {
            return res.status(404).json({
                message: "company Not found",
                success:false,
            })
        }

        return res.status(200).json({
            message: "company Information Updated.",
            success: true,
        });

    } catch (error) {
        console.log(error);
    }
}
