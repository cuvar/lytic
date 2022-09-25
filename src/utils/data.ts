function isAnalyticEntry(data: any): data is AnalyticEntry {
  return (
    typeof data.name === "string" &&
    typeof data.website === "string" &&
    typeof data.clicks === "number"
  );
}

export { isAnalyticEntry };
