import { useState, useEffect } from 'react';
import { checkEbookFiles, setupEbookStorage, EbookFileStatus } from '../utils/checkEbookFiles';
import { Button } from '../components/ui/button';
import { useAuth } from '../hooks/use-auth';
import { useNavigate } from 'react-router-dom';
import { Loader2, CheckCircle, XCircle, AlertTriangle } from 'lucide-react';

const EbooksDiagnostic = () => {
  const [fileStatuses, setFileStatuses] = useState<EbookFileStatus[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [setupLoading, setSetupLoading] = useState<boolean>(false);
  const [setupMessage, setSetupMessage] = useState<string>('');
  const [setupSuccess, setSetupSuccess] = useState<boolean | null>(null);
  const { user } = useAuth();
  const navigate = useNavigate();

  // Check if user is admin (this should match your RLS policy)
  const isAdmin = user?.email === 'artifaks7@gmail.com';

  useEffect(() => {
    if (!user) {
      navigate('/login');
      return;
    }

    if (!isAdmin) {
      navigate('/ebooks');
      return;
    }

    const runDiagnostics = async () => {
      setLoading(true);
      const results = await checkEbookFiles();
      setFileStatuses(results);
      setLoading(false);
    };

    runDiagnostics();
  }, [user, isAdmin, navigate]);

  const handleSetupStorage = async () => {
    setSetupLoading(true);
    setSetupMessage('');
    setSetupSuccess(null);

    const result = await setupEbookStorage();
    
    setSetupMessage(result.message);
    setSetupSuccess(result.success);
    setSetupLoading(false);

    // Refresh file statuses after setup
    if (result.success) {
      setLoading(true);
      const results = await checkEbookFiles();
      setFileStatuses(results);
      setLoading(false);
    }
  };

  const getMissingFilesCount = () => {
    return fileStatuses.filter(status => !status.fileExists && status.fileUrl).length;
  };

  const getMissingCoversCount = () => {
    return fileStatuses.filter(status => !status.coverExists && status.coverUrl).length;
  };

  const getNoFileCount = () => {
    return fileStatuses.filter(status => !status.fileUrl).length;
  };

  const getNoCoverCount = () => {
    return fileStatuses.filter(status => !status.coverUrl).length;
  };

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold mb-6">E-Books Diagnostic Tool</h1>
      
      {!user ? (
        <div className="p-4 bg-amber-100 rounded-md">
          <p>Please log in to access this page.</p>
        </div>
      ) : !isAdmin ? (
        <div className="p-4 bg-amber-100 rounded-md">
          <p>You don't have permission to access this page.</p>
        </div>
      ) : (
        <>
          <div className="mb-8 p-6 bg-slate-50 rounded-lg shadow-sm">
            <h2 className="text-xl font-semibold mb-4">Storage Setup</h2>
            <p className="mb-4">
              This will create the necessary storage bucket and folders for your ebooks if they don't exist.
            </p>
            
            <div className="flex items-center gap-4">
              <Button 
                onClick={handleSetupStorage} 
                disabled={setupLoading}
                className="bg-amber-600 hover:bg-amber-700"
              >
                {setupLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Setting up storage...
                  </>
                ) : (
                  'Setup Storage'
                )}
              </Button>
              
              {setupMessage && (
                <div className={`flex items-center ${setupSuccess ? 'text-green-600' : 'text-red-600'}`}>
                  {setupSuccess ? (
                    <CheckCircle className="h-5 w-5 mr-2" />
                  ) : (
                    <XCircle className="h-5 w-5 mr-2" />
                  )}
                  <span>{setupMessage}</span>
                </div>
              )}
            </div>
          </div>

          <div className="mb-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="p-4 bg-white rounded-lg shadow-sm border border-slate-200">
              <h3 className="font-medium text-lg">Total E-Books</h3>
              <p className="text-3xl font-bold mt-2">{fileStatuses.length}</p>
            </div>
            
            <div className={`p-4 rounded-lg shadow-sm border ${getMissingFilesCount() > 0 ? 'bg-red-50 border-red-200' : 'bg-green-50 border-green-200'}`}>
              <h3 className="font-medium text-lg">Missing Files</h3>
              <p className="text-3xl font-bold mt-2">{getMissingFilesCount()}</p>
            </div>
            
            <div className={`p-4 rounded-lg shadow-sm border ${getMissingCoversCount() > 0 ? 'bg-amber-50 border-amber-200' : 'bg-green-50 border-green-200'}`}>
              <h3 className="font-medium text-lg">Missing Covers</h3>
              <p className="text-3xl font-bold mt-2">{getMissingCoversCount()}</p>
            </div>
            
            <div className={`p-4 rounded-lg shadow-sm border ${getNoFileCount() > 0 ? 'bg-slate-50 border-slate-200' : 'bg-green-50 border-green-200'}`}>
              <h3 className="font-medium text-lg">No File Reference</h3>
              <p className="text-3xl font-bold mt-2">{getNoFileCount()}</p>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-sm border border-slate-200 overflow-hidden">
            <h2 className="text-xl font-semibold p-4 bg-slate-50 border-b border-slate-200">
              E-Book File Status
            </h2>
            
            {loading ? (
              <div className="flex justify-center items-center p-8">
                <Loader2 className="h-8 w-8 animate-spin text-amber-600" />
                <span className="ml-2">Checking file status...</span>
              </div>
            ) : fileStatuses.length === 0 ? (
              <div className="p-4 text-center">
                <p>No ebooks found in the database.</p>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="bg-slate-50">
                      <th className="p-3 text-left font-medium text-slate-600">Title</th>
                      <th className="p-3 text-left font-medium text-slate-600">File Status</th>
                      <th className="p-3 text-left font-medium text-slate-600">Cover Status</th>
                      <th className="p-3 text-left font-medium text-slate-600">File Path</th>
                      <th className="p-3 text-left font-medium text-slate-600">Cover Path</th>
                    </tr>
                  </thead>
                  <tbody>
                    {fileStatuses.map((status) => (
                      <tr key={status.id} className="border-t border-slate-200 hover:bg-slate-50">
                        <td className="p-3">{status.title}</td>
                        <td className="p-3">
                          {!status.fileUrl ? (
                            <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-slate-100 text-slate-800">
                              <AlertTriangle className="h-3 w-3 mr-1" />
                              No file
                            </span>
                          ) : status.fileExists ? (
                            <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                              <CheckCircle className="h-3 w-3 mr-1" />
                              OK
                            </span>
                          ) : (
                            <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-red-100 text-red-800">
                              <XCircle className="h-3 w-3 mr-1" />
                              Missing
                            </span>
                          )}
                        </td>
                        <td className="p-3">
                          {!status.coverUrl ? (
                            <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-slate-100 text-slate-800">
                              <AlertTriangle className="h-3 w-3 mr-1" />
                              No cover
                            </span>
                          ) : status.coverExists ? (
                            <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                              <CheckCircle className="h-3 w-3 mr-1" />
                              OK
                            </span>
                          ) : (
                            <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-amber-100 text-amber-800">
                              <XCircle className="h-3 w-3 mr-1" />
                              Missing
                            </span>
                          )}
                        </td>
                        <td className="p-3 text-sm font-mono">
                          {status.fileUrl || 'N/A'}
                        </td>
                        <td className="p-3 text-sm font-mono">
                          {status.coverUrl || 'N/A'}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>

          <div className="mt-8">
            <h2 className="text-xl font-semibold mb-4">What to do next?</h2>
            <div className="bg-white rounded-lg shadow-sm border border-slate-200 p-6">
              <h3 className="font-medium text-lg mb-2">If you have missing files:</h3>
              <ol className="list-decimal pl-6 space-y-2">
                <li>Make sure the storage bucket and folders are set up (use the "Setup Storage" button above)</li>
                <li>Upload the missing files through the Supabase dashboard:
                  <ul className="list-disc pl-6 mt-1">
                    <li>Go to your Supabase project dashboard</li>
                    <li>Navigate to Storage</li>
                    <li>Select the "ebooks" bucket</li>
                    <li>Upload files to the "files" folder and covers to the "covers" folder</li>
                  </ul>
                </li>
                <li>Alternatively, edit the ebooks in the admin interface and re-upload the files</li>
              </ol>

              <h3 className="font-medium text-lg mt-6 mb-2">If you have incorrect file paths:</h3>
              <ol className="list-decimal pl-6 space-y-2">
                <li>Edit the ebook in the admin interface to update the file paths</li>
                <li>Make sure the file names match exactly what's in the storage bucket</li>
                <li>For bulk updates, you may need to run SQL queries in the Supabase dashboard</li>
              </ol>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default EbooksDiagnostic;
