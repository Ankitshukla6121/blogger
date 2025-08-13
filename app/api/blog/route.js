import { connectDB } from "@/lib/config/db";
import BlogModel from "@/lib/models/BlogModel";
import cloudinary from "@/lib/config/cloudinary";
import { NextResponse } from "next/server";

await connectDB();

export async function POST(request) {
  try {
    const formData = await request.formData();

    const image = formData.get("image"); 
    const authorImg = formData.get("authorImg"); 

    if (!image) {
      return NextResponse.json(
        { success: false, msg: "Blog image is required" },
        { status: 400 }
      );
    }

 
    const uploadToCloudinary = async (file, folder) => {
      const buffer = Buffer.from(await file.arrayBuffer());
      const base64Image = `data:${file.type};base64,${buffer.toString(
        "base64"
      )}`;
      const uploadRes = await cloudinary.uploader.upload(base64Image, {
        folder,
      });
      return uploadRes.secure_url;
    };

  
    const blogImageUrl = await uploadToCloudinary(image, "blogs");

    
    const blogData = {
      title: formData.get("title"),
      description: formData.get("description"),
      category: formData.get("category"),
      author: formData.get("author"),
      image: blogImageUrl,
      authorImg: authorImg || "/author_img.png", 
    };

    await BlogModel.create(blogData);

    return NextResponse.json({
      success: true,
      msg: "Blog Added",
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { success: false, msg: "Server error" },
      { status: 500 }
    );
  }
}

export async function GET(request) {


  const blogId= request.nextUrl.searchParams.get("id");
  if(blogId){
    const blog= await  BlogModel.findById(blogId);;
    return NextResponse.json(blog)
  }else{
const blogs= await BlogModel.find({})
  return NextResponse.json({ blogs });
  }
  
}


//  creating the api endpoint to delete blog

export async function DELETE(request){
const blogId= request.nextUrl.searchParams.get("id");
  await BlogModel.findByIdAndDelete(blogId);
  return NextResponse.json({msg:"Blog Deleted"});
}