const generateJson = async (path: string, filename: string, data: any): Promise<boolean> => {
  try {
    const response = await fetch('/api/rewrite-json', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ path: path, filename: filename, data: data }),
    });

    if (!response.ok) {
      throw new Error('Failed to save JSON');
    }
    const result = await response.text();
    if(result) {
      return true
    }else{
      return false
    }
  } catch (error) {
    console.error('Error saving JSON:', error);
    return false
  }
};

export { generateJson };