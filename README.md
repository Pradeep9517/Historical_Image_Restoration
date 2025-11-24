Backend Setup :-

cd backend
python -m venv .venv
.\.venv\Scripts\activate   # Windows
pip install -r requirements.txt 
npm install

Create .env inside backend:-
PORT=5000
MONGODB_URI=mongodb://localhost:27017/image_restore_db
JWT_SECRET=your_secret_key_here
BASE_URL=http://localhost:5000

Ye file backend/ folder ke andar banao:-

# Core AI / PyTorch
torch>=2.2.0
torchvision>=0.17.0
torchaudio>=2.2.0

# Image restoration models
zeroscratches
deoldify
fastai==2.7.13
kornia<0.7

# Image processing
opencv-python
Pillow
numpy

# Model hub / download
huggingface-hub
requests
tqdm

# Extra supporting libs
matplotlib
scikit-image
