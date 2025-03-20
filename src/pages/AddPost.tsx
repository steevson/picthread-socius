
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Layout from '@/components/Layout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from "@/hooks/use-toast";
import { X, Upload, ImageIcon } from 'lucide-react';

const AddPost = () => {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [caption, setCaption] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleImageSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setSelectedImage(e.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  // For direct picsum image selection (as a fallback)
  const handleDirectImageSelect = () => {
    const randomId = Math.floor(Math.random() * 1000);
    setSelectedImage(`https://picsum.photos/800?random=${randomId}`);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedImage) {
      toast({
        title: "No image selected",
        description: "Please select an image to post",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      toast({
        title: "Post created!",
        description: "Your post has been shared successfully",
      });
      setIsLoading(false);
      navigate('/');
    }, 1500);
  };

  const handleCancel = () => {
    setSelectedImage(null);
    setCaption('');
  };

  return (
    <Layout className="max-w-2xl mx-auto">
      <div className="bg-white dark:bg-gray-950 p-6 rounded-xl border border-border">
        <h1 className="text-2xl font-bold mb-6">Create New Post</h1>
        
        <form onSubmit={handleSubmit}>
          {/* Image upload/preview area */}
          <div className="mb-6">
            {selectedImage ? (
              <div className="relative">
                <img 
                  src={selectedImage} 
                  alt="Selected preview" 
                  className="w-full h-[300px] object-contain bg-black rounded-md"
                />
                <button
                  type="button"
                  onClick={() => setSelectedImage(null)}
                  className="absolute top-2 right-2 p-1 bg-gray-900/70 rounded-full text-white"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>
            ) : (
              <div className="border-2 border-dashed border-gray-300 dark:border-gray-700 rounded-md p-12 text-center">
                <div className="flex flex-col items-center justify-center">
                  <ImageIcon className="h-12 w-12 text-gray-400 mb-3" />
                  <p className="mb-4 text-sm text-gray-500 dark:text-gray-400">
                    Drag and drop your image here, or click to select
                  </p>
                  <Input
                    type="file"
                    id="image-upload"
                    accept="image/*"
                    onChange={handleImageSelect}
                    className="hidden"
                  />
                  <div className="flex gap-2">
                    <label htmlFor="image-upload">
                      <Button type="button" variant="outline" size="sm">
                        <Upload className="h-4 w-4 mr-2" />
                        Upload Image
                      </Button>
                    </label>
                    <Button 
                      type="button" 
                      variant="outline" 
                      size="sm" 
                      onClick={handleDirectImageSelect}
                    >
                      <ImageIcon className="h-4 w-4 mr-2" />
                      Use Random Image
                    </Button>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Caption input */}
          <div className="mb-6">
            <label 
              htmlFor="caption" 
              className="block mb-2 text-sm font-medium"
            >
              Caption
            </label>
            <Textarea
              id="caption"
              placeholder="Write a caption..."
              value={caption}
              onChange={(e) => setCaption(e.target.value)}
              className="min-h-[100px]"
            />
          </div>

          {/* Action buttons */}
          <div className="flex justify-end space-x-2">
            <Button
              type="button"
              variant="outline"
              onClick={handleCancel}
              disabled={isLoading}
            >
              Cancel
            </Button>
            <Button 
              type="submit" 
              disabled={isLoading || !selectedImage}
            >
              {isLoading ? 'Posting...' : 'Share Post'}
            </Button>
          </div>
        </form>
      </div>
    </Layout>
  );
};

export default AddPost;
